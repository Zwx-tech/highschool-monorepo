<script lang="ts">
    import { letterStatus } from "../stores/store";
    export let key:string;
    let color=''
    const colors = ['null', 'none', 'some', 'match']
    letterStatus.subscribe(v => {
        color = colors[v[key]] || 'null';
    })
    const keyHandle = () => {
        console.log(123)
        window.dispatchEvent(
            new KeyboardEvent('keyup', {key})
        )
    }
</script>


<button on:click={keyHandle} class={`min-w-[3.5rem] box-border px-2 h-14 border text-center text-2xl rounded-lg border-2 cursor-pointer ${color}`}>
    <slot>
        {key}
    </slot>
</button>
