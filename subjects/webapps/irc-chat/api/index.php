<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    //$connection = mysqli_connect("127.0.0.1","root","","irc");
    $DB_HOST="aws.connect.psdb.cloud";
    $DB_USERNAME="PLACEHOLDER_USERNAME";
    $DB_PASSWORD="PLACEHOLDER_PASSWORD";
    $DB_NAME="v-irc";
    $connection = mysqli_init();
    $CA_FILE = __DIR__ . '/asdasfd.pem';
    $connection->ssl_set(NULL, NULL, $CA_FILE, NULL, NULL);
    $connection->real_connect($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

    function waitForMessage($connection, $lastMessageId) {
        // get highest message id 
        if((int)$lastMessageId == -1) {
            $query = "SELECT MAX(id) AS highest_id FROM messages;";
            $result = $connection->query($query);

            if ($result) {
                $row = $result->fetch_assoc();
                $highestId = $row['highest_id'];
                echo json_encode(["highestMessageId" => $highestId]);
                return;
            }
        }
        // longpoll stuff
        while (true) {
            $query = "SELECT * FROM messages WHERE id > ?";
            $stmt = $connection->prepare($query);
            $stmt->bind_param("i", $lastMessageId);
            $stmt->execute();
    
            $result = $stmt->get_result();
            
            // if there are any new message return 'em
            if ($result->num_rows > 0) {
                $messages = $result->fetch_all(MYSQLI_ASSOC);
                $highestId = max(array_column($messages, 'id'));
                echo json_encode(["highestMessageId" => $highestId, "newMessages" => $messages]);
                break;  
            }
            usleep(50000); 
        }
    }

    function handleMessageInsert($connection, $author, $content, $color) {
        // Prepare and execute insert query
        $sql = "INSERT INTO messages (author, content, color) VALUES (?, ?, ?)";
        $stmt = $connection->prepare($sql);

        if (!$stmt) {
            die('Error in preparing statement: ' . $connection->error);
        }

        $stmt->bind_param("sss", $author, $content, $color);

        if (!$stmt->execute()) {
            echo json_encode(["status" => "failed", "error" => $stmt->error]);
        } else {
            echo json_encode(["status" => "success", "post" => $author]);
        }

        $stmt->close();
        usleep(2000000);
         // Prepare and execute delete query
         $sql = "DELETE FROM messages WHERE author=? AND content=?";
         $stmt = $connection->prepare($sql);
 
         if (!$stmt) {
             die('Error in preparing statement: ' . $connection->error);
         }
 
         $stmt->bind_param("ss", $author, $content);
         $stmt->execute();
    }

    function handleNewMessage($connection, $author, $content, $color) {
        // handle normal messages
        if(!str_starts_with($content, "/")) {
            handleMessageInsert($connection, $author, $content, $color);
            return;
        }
        // handle commands
        if(str_starts_with($content, "/")) {
            $command = substr($content, 1);
            switch($command) {
                case "help":
                    echo json_encode(["status" => "success", "type" => "command", "response" => "help"]);
                    break;
                default:
                    echo json_encode(["status" => "failed", "error" => "Unknown command"]);
                    break;
            }
            return;
        }
    }

    // handle message update via Long pull
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $lastMessageId = $_GET['lastMessageId'];
        waitForMessage($connection, $lastMessageId);
    }

    // handle new message 
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true); // magic 
        $author = $data['author'] ?? '';
        $content = $data['content'] ?? '';
        $color = $data['color'] ?? '';
        handleNewMessage($connection, $author, $content, $color);
    }

    $connection->close();
?>

