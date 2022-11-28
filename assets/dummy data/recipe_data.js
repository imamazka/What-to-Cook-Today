const ingredients = [
    {
        id: 1,
        title: "2 gr sugar",
    },
    {
        id: 2,
        title: "3 tomato",
    },
    {
        id: 3,
        title: "1 eggs",
    },
    {
        id: 4,
        title: "3 pound oats",
    },
  ];

const recipes = [
    {
        id: 1,
        name: "Mac & Cheese",
        image: require('../../assets/Food1.jpg'),
        ingredients,
        description:
            "Minim id eiusmod laborum excepteur officia. Lorem ad enim voluptate elit sunt velit nostrud voluptate. Ut nostrud et aliqua do eiusmod laboris magna occaecat aliquip. Reprehenderit veniam veniam cupidatat labore dolore aute laboris voluptate consectetur consectetur elit.",
        rating: 4.7,
        time: "30 min",
    },
    {
        id: 2,
        name: "Fettuccine Alfredo",
        image: require('../../assets/Food2.jpg'),
        ingredients,
        description:
            "Minim id eiusmod laborum excepteur officia. Lorem ad enim voluptate elit sunt velit nostrud voluptate. Ut nostrud et aliqua do eiusmod laboris magna occaecat aliquip. Reprehenderit veniam veniam cupidatat labore dolore aute laboris voluptate consectetur consectetur elit.",
        rating: 4.5,
        time: "1 hr",
    },
    {
        id: 3,
        name: "Cheese Burger",
        image: require('../../assets/Food3.jpg'),
        ingredients,
        description:
            "Minim id eiusmod laborum excepteur officia. Lorem ad enim voluptate elit sunt velit nostrud voluptate. Ut nostrud et aliqua do eiusmod laboris magna occaecat aliquip. Reprehenderit veniam veniam cupidatat labore dolore aute laboris voluptate consectetur consectetur elit.",
        rating: 4.9,
        time: "15 min",
    },
    {
        id: 4,
        name: "Rendang",
        image: require('../../assets/Food4.jpg'),
        ingredients,
        description:
          "Minim id eiusmod laborum excepteur officia. Lorem ad enim voluptate elit sunt velit nostrud voluptate. Ut nostrud et aliqua do eiusmod laboris magna occaecat aliquip. Reprehenderit veniam veniam cupidatat labore dolore aute laboris voluptate consectetur consectetur elit.",
        rating: 4.6,
        time: "2 hr",
    },
];

export default recipes;