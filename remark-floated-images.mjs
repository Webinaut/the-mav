import { visit } from "unist-util-visit";

export function remarkFloatedImages() {
  return (tree) => {
    // Scans the document tree looking exclusively for native markdown image nodes
    visit(tree, "image", (node) => {
      const { url } = node;

      // Detect our custom layout hash: e.g., filename.jpg#left_size-medium_margin-normal
      if (url && url.includes("#")) {
        const [cleanUrl, hashParams] = url.split("#");
        const [align, sizeClass, marginClass] = hashParams.split("_");

        // 1. Strip the hash from the URL so Astro can locate and bundle the asset
        node.url = cleanUrl;

        // 2. Initialize the HTML attributes data storage object on the node
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};

        // 3. Build out clean, valid HTML classes instead of relying on URL selectors
        const classes = ["cms-floated-image"];
        if (align) classes.push(`align-${align}`);
        if (sizeClass) classes.push(sizeClass);
        if (marginClass) classes.push(marginClass);

        // Assign the array elements as standard classes onto the output node
        node.data.hProperties.class = classes.join(" ");
      }
    });
  };
}
