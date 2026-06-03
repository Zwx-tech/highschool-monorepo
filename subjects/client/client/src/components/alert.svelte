<script>
    export let isVisible = true;
    export let message = "";
    export let type = "info"; // You can set default type to 'info', 'success', 'warning', or 'error'
    export let hasTimeout=false;
    $: {
        if(isVisible && hasTimeout) {
            setTimeout(() => isVisible=false, 3000);
        }
    }
  </script>
  
  <div class={`flex px-4 rounded-lg gap-4 overflow-hidden items-center alert ${type} ${isVisible ? 'visible' : ''}`}>
    <span>{message}</span>
  </div>
  
  <style >
    .alert {
      transition: height ease-in .3s;
      height: 0;
    }
    .visible {
        height: 3rem;
    }
    .info {
      background-color: #f3f4f6; /* Green */
      color: #000;
    }
  
    .success {
      background-color: #28a745; /* Dark green */
      color: white;
    }
  
    .warning {
      background-color: #ffc107; /* Yellow */
      color: #333;
    }
  
    .error {
      background-color: #dc3545; /* Red */
      color: white;
    }
  
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  </style>
  