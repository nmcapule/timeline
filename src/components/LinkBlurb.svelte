<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { Subject } from "rxjs";
  import { debounceTime, filter } from "rxjs/operators";

  const dispatch = createEventDispatcher();

  export let blurb: string | any[];
  export let editing = false;

  const edit = new Subject();
  edit
    .pipe(
      filter(() => editing),
      debounceTime(1000)
    )
    .subscribe((event: CustomEvent) => {
      const elem = event.target as HTMLElement;
      const blurb = elem.innerText.split("\n\n");
      dispatch("edit", blurb);
    });

  onDestroy(() => {
    edit.complete();
  });
</script>

<div
  class="link-blurb"
  contenteditable={editing}
  on:keyup={(event) => edit.next(event)}
>
  {#each blurb as paragraph}
    <p>{paragraph}</p>
  {/each}
</div>

<style lang="less">
  .link-blurb {
    color: var(--color-silver);
    flex-grow: 1;
  }
</style>
