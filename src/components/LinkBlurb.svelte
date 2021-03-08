<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  const dispatch = createEventDispatcher();
  const uuid = uuidv4();

  export let blurb: any;
  export let editing = false;

  let editor: any;
  onMount(async () => {
    const { default: Quill } = await import("quill");
    const selector = "#" + CSS.escape(uuid);
    editor = new Quill(selector, {
      placeholder: "Type here to add text...",
      theme: "bubble",
    });

    editor.on("text-change", () => {
      if (!editing) {
        return;
      }
      dispatch("edit", editor.getContents());
    });
  });

  $: if (editor) {
    editor.enable(editing);
  }

  $: if (editor && blurb && !editing) {
    if (typeof blurb === "string") {
      editor.setText(blurb);
    } else {
      editor.setContents(blurb);
    }
  }
</script>

<div class="link-blurb">
  <div id={uuid} />
</div>

<style lang="less">
  .link-blurb {
    flex-grow: 1;

    :global(.ql-editor) {
      font-size: 16px;
    }
  }
</style>
