<script>
    import Slider from "./Slider.svelte";

    let red = 200;
    let green = 100;
    let blue = 180;
</script>
<section class="">
    <h2 class="text-center text-3xl">Lekcja 2</h2>
    <div class="flex flex-wrap m-[3rem] flex-col items-center">
        <div class="p-2 w-1/2 flex flex-col items-center">
            <Slider bind:color={red} colorName={"Red"}></Slider>
            <Slider bind:color={green} colorName={"Green"}></Slider>
            <Slider bind:color={blue} colorName={"Blue"}></Slider>
            <div class="mt-8 w-1/2 aspect-square bg-red-500 rounded-md" style={`background-color: rgb(${red}, ${green}, ${blue})`}>            </div>
            <p class="">rgb({red}, {green}, {blue})</p>
        </div>
</section>
