import {
  Blocks,
  Phone,
  AudioLines,
  MessageSquareReply,
  Boxes,
  Videotape,
  Component,
} from "lucide-react";

import { paths } from "./routes/paths";

export const navData = [
  /**
   * Alpha
   */
  {
    subheader: "Alpha",
    items: [
      {
        name: "Home",
        url: paths.home,
        icon: <Blocks className="h-5 w-6" />,
      },
    ],
  },
];
