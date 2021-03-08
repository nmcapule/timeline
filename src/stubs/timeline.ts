import { v4 as uuidv4 } from "uuid";
import type { Link, Node, Timeline } from "../models/timeline";
import { blurbGenerator } from "../utils/blurb";

export function timelineStub(): Timeline {
  return {
    id: "stub",
    title: "Lorem ipsum dolor sit amet",
    created: new Date(),
    nodes: [
      {
        id: "1001",
        links: [
          {
            id: "1",
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
          {
            id: "2",
            url: "http://www.google.com",
            title: "Google Link 2",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5).join("\n\n"),
      },
      {
        id: "1002",
        links: [
          {
            id: "3",
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5).join("\n\n"),
      },
      {
        id: "1003",
        links: [
          {
            id: "4",
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5).join("\n\n"),
      },
    ],
  };
}

export function emptyLink(): Link {
  return {
    id: uuidv4(),
    url: "",
    description: "",
    title: "",
  };
}

export function emptyNode(): Node {
  return {
    id: uuidv4(),
    links: [emptyLink()],
    tags: [],
    blurb: "",
  };
}
