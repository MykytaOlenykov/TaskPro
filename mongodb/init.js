const db = db.getSiblingDB("taskpro_db");

if (db.backgrounds.countDocuments() === 0) {
  db.backgrounds.insertMany([
    {
      previewUrl:
        "/backgrounds/preview/0883dec5-05a2-4e9d-895c-fef4b40a7380.jpg",
      baseUrl: "/backgrounds/base/0883dec5-05a2-4e9d-895c-fef4b40a7380.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/493aeadd-f18a-4020-ab5c-927bb635a936.jpg",
      baseUrl: "/backgrounds/base/493aeadd-f18a-4020-ab5c-927bb635a936.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/3f74b573-0dd6-4a74-bf42-283bb82b7776.jpg",
      baseUrl: "/backgrounds/base/3f74b573-0dd6-4a74-bf42-283bb82b7776.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/1d2d61b5-845a-4bf1-928c-3a423fb01621.jpg",
      baseUrl: "/backgrounds/base/1d2d61b5-845a-4bf1-928c-3a423fb01621.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/541e249a-1145-4b54-957d-1dd104de451c.jpg",
      baseUrl: "/backgrounds/base/541e249a-1145-4b54-957d-1dd104de451c.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/e664dd76-0834-4b97-a3a6-38225cae2343.jpg",
      baseUrl: "/backgrounds/base/e664dd76-0834-4b97-a3a6-38225cae2343.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/87696d9c-d9fc-456c-bcda-0ede3e7c2b88.jpg",
      baseUrl: "/backgrounds/base/87696d9c-d9fc-456c-bcda-0ede3e7c2b88.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/bd4a35c9-f9dc-481d-918f-db18f71426ac.jpg",
      baseUrl: "/backgrounds/base/bd4a35c9-f9dc-481d-918f-db18f71426ac.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/7816e189-31bf-41c6-9111-3a905f4a8f84.jpg",
      baseUrl: "/backgrounds/base/7816e189-31bf-41c6-9111-3a905f4a8f84.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/8c51c517-1b13-43cc-87c1-d613da95b91e.jpg",
      baseUrl: "/backgrounds/base/8c51c517-1b13-43cc-87c1-d613da95b91e.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/8290a954-445b-4d2e-8ca7-56da0428e013.jpg",
      baseUrl: "/backgrounds/base/8290a954-445b-4d2e-8ca7-56da0428e013.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/3c3e4f10-a714-4a61-b040-26051de3c395.jpg",
      baseUrl: "/backgrounds/base/3c3e4f10-a714-4a61-b040-26051de3c395.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/b71749e3-7c98-49cb-b10e-5b0bf3f5026d.jpg",
      baseUrl: "/backgrounds/base/b71749e3-7c98-49cb-b10e-5b0bf3f5026d.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/98819df9-1275-4a66-a1fe-803c9d585723.jpg",
      baseUrl: "/backgrounds/base/98819df9-1275-4a66-a1fe-803c9d585723.jpg",
    },
    {
      previewUrl:
        "/backgrounds/preview/28b8d9d4-ae76-4ffe-971e-b420573981a0.jpg",
      baseUrl: "/backgrounds/base/28b8d9d4-ae76-4ffe-971e-b420573981a0.jpg",
    },
  ]);
}

if (db.icons.countDocuments() === 0) {
  db.icons.insertMany([
    {
      url: "/icons/container.svg",
    },
    {
      url: "/icons/lightning.svg",
    },
    {
      url: "/icons/colors.svg",
    },
    {
      url: "/icons/puzzle-piece.svg",
    },
    {
      url: "/icons/star.svg",
    },
    {
      url: "/icons/hexagon.svg",
    },
    {
      url: "/icons/project.svg",
    },
    {
      url: "/icons/loading.svg",
    },
  ]);
}

if (db.task_priorities.countDocuments() === 0) {
  db.task_priorities.insertMany([
    {
      name: "Without priority",
      color: null,
      quantity: 4,
    },
    {
      name: "Low",
      color: "#8FA1D0",
      quantity: 3,
    },
    {
      name: "Medium",
      color: "#E09CB5",
      quantity: 2,
    },
    {
      name: "High",
      color: "#BEDBB0",
      quantity: 1,
    },
  ]);
}
