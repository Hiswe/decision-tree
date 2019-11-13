export default {
  id: 0,
  feature: "Catch_Rate",
  rule: "<=",
  value: 9,
  gini: 0.11946,
  samples: 721,
  left: {
    id: 1,
    feature: "Egg_Group_1",
    rule: "<=",
    value: 11,
    gini: 0.2688,
    samples: 50,
    left: {
      id: 2,
      criterion: "gini",
      impurity: 0,
      samples: 3,
      value: [3, false]
    },
    right: {
      id: 3,
      feature: "Attack",
      rule: "<=",
      value: 73.5,
      gini: 0.190131,
      samples: 47,
      left: {
        id: 4,
        feature: "Number",
        rule: "<=",
        value: 433,
        gini: 0.444444,
        samples: 3,
        left: {
          id: 5,
          criterion: "gini",
          impurity: 0,
          samples: 1,
          value: [false, true]
        },
        right: {
          id: 6,
          criterion: "gini",
          impurity: 0,
          samples: 2,
          value: [2, false]
        }
      },
      right: {
        id: 7,
        feature: "Egg_Group_1",
        rule: "<=",
        value: 12.5,
        gini: 0.127066,
        samples: 44,
        left: {
          id: 8,
          feature: "Type_1",
          rule: "<=",
          value: 1.5,
          gini: 0.088697,
          samples: 43,
          left: {
            id: 9,
            criterion: "gini",
            impurity: 0,
            samples: 1,
            value: [true, false]
          },
          right: {
            id: 10,
            criterion: "gini",
            impurity: 0.046485,
            samples: 42,
            value: [true, 41]
          }
        },
        right: {
          id: 11,
          criterion: "gini",
          impurity: 0,
          samples: 1,
          value: [true, false]
        }
      }
    }
  },
  right: {
    id: 12,
    feature: "Total",
    rule: "<=",
    value: 675,
    gini: 0.011851,
    samples: 671,
    left: {
      id: 13,
      feature: "Total",
      rule: "<=",
      value: 583.5,
      gini: 0.00299,
      samples: 668,
      left: {
        id: 14,
        criterion: "gini",
        impurity: 0,
        samples: 658,
        value: [658, false]
      },
      right: {
        id: 15,
        feature: "Weight_kg",
        rule: "<=",
        value: 3.05,
        gini: 0.18,
        samples: 10,
        left: {
          id: 16,
          criterion: "gini",
          impurity: 0,
          samples: 1,
          value: [false, true]
        },
        right: {
          id: 17,
          criterion: "gini",
          impurity: 0,
          samples: 9,
          value: [9, false]
        }
      }
    },
    right: {
      id: 18,
      criterion: "gini",
      impurity: 0,
      samples: 3,
      value: [false, 3]
    }
  }
};
