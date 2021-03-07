import type { Timeline } from "../models/timeline";
import { blurbGenerator } from "../utils/blurb";

export const timelineStub: Timeline = {
  id: "stub",
  title: "Lorem ipsum dolor sit amet",
  created: new Date(),
  nodes: [
    {
      id: "1001",
      links: [
        {
          url: "http://www.google.com",
          title: "Google Link",
          description: blurbGenerator(false, 1, 1),
        },
        {
          url: "http://www.google.com",
          title: "Google Link 2",
          description: blurbGenerator(false, 1, 1),
        },
      ],
      tags: ["career"],
      blurb: blurbGenerator(true, 0, 5),
    },
    {
      id: "1002",
      links: [
        {
          url: "http://www.google.com",
          title: "Google Link",
          description: blurbGenerator(false, 1, 1),
        },
      ],
      tags: ["career"],
      blurb: blurbGenerator(true, 0, 5),
    },
    {
      id: "1003",
      links: [
        {
          url: "http://www.google.com",
          title: "Google Link",
          description: blurbGenerator(false, 1, 1),
        },
      ],
      tags: ["career"],
      blurb: blurbGenerator(true, 0, 5),
    },
  ],
};