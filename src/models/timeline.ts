export interface Link {
  url: string;
  title: string;
  description: string | any;
  imageUrl?: string;
}

export interface Node {
  id: string;
  links: Link[];
  tags: string[];
  blurb: string | any;
}

export interface Timeline {
  id: string;
  title: string;
  created: Date;
  nodes: Node[];
}
