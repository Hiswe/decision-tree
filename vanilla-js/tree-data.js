export default {
  id: 0,
  feature: "grade",
  rule: "<=",
  value: 8.5,
  mse: 133063734669.54272,
  samples: 17351,
  left: {
    id: 1,
    feature: "lat",
    rule: "<=",
    value: 47.53365,
    mse: 38167692772.39398,
    samples: 13962,
    left: {
      id: 2,
      feature: "sqft_living",
      rule: "<=",
      value: 1938,
      mse: 13533215234.568542,
      samples: 5808,
      left: {
        id: 3,
        feature: "sqft_living",
        rule: "<=",
        value: 1405,
        mse: 6837890991.549484,
        samples: 3656,
        left: {
          id: 4,
          feature: "long",
          rule: "<=",
          value: -122.3765,
          mse: 5594450508.215691,
          samples: 1745,
          left: {
            id: 5,
            criterion: "mse",
            impurity: 8908010317.949036,
            samples: 95,
            value: [343277.4210526316]
          },
          right: {
            id: 6,
            criterion: "mse",
            impurity: 4747919529.784714,
            samples: 1650,
            value: [233527.26424242425]
          }
        },
        right: {
          id: 7,
          feature: "lat",
          rule: "<=",
          value: 47.4125,
          mse: 6482072137.427002,
          samples: 1911,
          left: {
            id: 8,
            criterion: "mse",
            impurity: 2893771304.82254,
            samples: 1033,
            value: [268071.77928363986]
          },
          right: {
            id: 9,
            criterion: "mse",
            impurity: 8791633917.22966,
            samples: 878,
            value: [327548.61617312074]
          }
        }
      },
      right: {
        id: 10,
        feature: "view",
        rule: "<=",
        value: 0.5,
        mse: 15484457526.535706,
        samples: 2152,
        left: {
          id: 11,
          feature: "sqft_living",
          rule: "<=",
          value: 2616,
          mse: 9990340498.233856,
          samples: 1937,
          left: {
            id: 12,
            criterion: "mse",
            impurity: 7109519433.796707,
            samples: 1445,
            value: [351174.7307958478]
          },
          right: {
            id: 13,
            criterion: "mse",
            impurity: 11772550916.342834,
            samples: 492,
            value: [445793.6707317073]
          }
        },
        right: {
          id: 14,
          feature: "long",
          rule: "<=",
          value: -122.349,
          mse: 42289404752.74713,
          samples: 215,
          left: {
            id: 15,
            criterion: "mse",
            impurity: 49419534857.666626,
            samples: 72,
            value: [666594.3333333334]
          },
          right: {
            id: 16,
            criterion: "mse",
            impurity: 25388530400.616486,
            samples: 143,
            value: [467225.92307692306]
          }
        }
      }
    },
    right: {
      id: 17,
      feature: "sqft_living",
      rule: "<=",
      value: 2035,
      mse: 37285484173.5188,
      samples: 8154,
      left: {
        id: 18,
        feature: "sqft_living",
        rule: "<=",
        value: 1455.5,
        mse: 19772843685.71759,
        samples: 5479,
        left: {
          id: 19,
          feature: "lat",
          rule: "<=",
          value: 47.69605,
          mse: 14287812335.773712,
          samples: 2660,
          left: {
            id: 20,
            criterion: "mse",
            impurity: 15817027120.178192,
            samples: 1763,
            value: [440319.61826432217]
          },
          right: {
            id: 21,
            criterion: "mse",
            impurity: 5367736243.873276,
            samples: 897,
            value: [345854.0546265329]
          }
        },
        right: {
          id: 22,
          feature: "lat",
          rule: "<=",
          value: 47.69535,
          mse: 19726231795.950806,
          samples: 2819,
          left: {
            id: 23,
            criterion: "mse",
            impurity: 21041470314.9364,
            samples: 1877,
            value: [553019.2583910496]
          },
          right: {
            id: 24,
            criterion: "mse",
            impurity: 7159672561.870178,
            samples: 942,
            value: [430800.8906581741]
          }
        }
      },
      right: {
        id: 25,
        feature: "lat",
        rule: "<=",
        value: 47.71655,
        mse: 48604279797.91907,
        samples: 2675,
        left: {
          id: 26,
          feature: "waterfront",
          rule: "<=",
          value: 0.5,
          mse: 50796870164.078,
          samples: 2002,
          left: {
            id: 27,
            criterion: "mse",
            impurity: 44128142010.04767,
            samples: 1990,
            value: [692628.179396985]
          },
          right: {
            id: 28,
            criterion: "mse",
            impurity: 194492750000.0,
            samples: 12,
            value: [1676500.0]
          }
        },
        right: {
          id: 29,
          feature: "waterfront",
          rule: "<=",
          value: 0.5,
          mse: 17548338878.391876,
          samples: 673,
          left: {
            id: 30,
            criterion: "mse",
            impurity: 11083627770.207825,
            samples: 670,
            value: [512198.17164179106]
          },
          right: {
            id: 31,
            criterion: "mse",
            impurity: 68550000000.0,
            samples: 3,
            value: [1695000.0]
          }
        }
      }
    }
  },
  right: {
    id: 32,
    feature: "sqft_living",
    rule: "<=",
    value: 4062.5,
    mse: 302889141741.56165,
    samples: 3389,
    left: {
      id: 33,
      feature: "lat",
      rule: "<=",
      value: 47.52615,
      mse: 126691000623.51013,
      samples: 2847,
      left: {
        id: 34,
        feature: "waterfront",
        rule: "<=",
        value: 0.5,
        mse: 39236472312.4303,
        samples: 646,
        left: {
          id: 35,
          feature: "sqft_living",
          rule: "<=",
          value: 3173,
          mse: 27700456120.3797,
          samples: 631,
          left: {
            id: 36,
            criterion: "mse",
            impurity: 17870038029.664307,
            samples: 421,
            value: [489078.26840855106]
          },
          right: {
            id: 37,
            criterion: "mse",
            impurity: 28726357114.15033,
            samples: 210,
            value: [656411.5666666667]
          }
        },
        right: {
          id: 38,
          feature: "sqft_living",
          rule: "<=",
          value: 2105,
          mse: 162575280622.2224,
          samples: 15,
          left: {
            id: 39,
            criterion: "mse",
            impurity: 47521046875.0,
            samples: 4,
            value: [710875.0]
          },
          right: {
            id: 40,
            criterion: "mse",
            impurity: 107267238842.9751,
            samples: 11,
            value: [1314445.4545454546]
          }
        }
      },
      right: {
        id: 41,
        feature: "sqft_living",
        rule: "<=",
        value: 3065,
        mse: 122357917175.31018,
        samples: 2201,
        left: {
          id: 42,
          feature: "yr_built",
          rule: "<=",
          value: 1971.5,
          mse: 68145604164.08484,
          samples: 1228,
          left: {
            id: 43,
            criterion: "mse",
            impurity: 91362999214.40637,
            samples: 249,
            value: [1030949.3092369478]
          },
          right: {
            id: 44,
            criterion: "mse",
            impurity: 45805256575.09619,
            samples: 979,
            value: [746249.5393258428]
          }
        },
        right: {
          id: 45,
          feature: "long",
          rule: "<=",
          value: -122.1865,
          mse: 150658917644.3794,
          samples: 973,
          left: {
            id: 46,
            criterion: "mse",
            impurity: 197799746026.82373,
            samples: 399,
            value: [1333297.2706766918]
          },
          right: {
            id: 47,
            criterion: "mse",
            impurity: 37521092990.42468,
            samples: 574,
            value: [890591.8954703832]
          }
        }
      }
    },
    right: {
      id: 48,
      feature: "waterfront",
      rule: "<=",
      value: 0.5,
      mse: 746127426452.3511,
      samples: 542,
      left: {
        id: 49,
        feature: "long",
        rule: "<=",
        value: -122.18851,
        mse: 529773250426.82227,
        samples: 508,
        left: {
          id: 50,
          feature: "sqft_living",
          rule: "<=",
          value: 8935,
          mse: 781267202443.8003,
          samples: 210,
          left: {
            id: 51,
            criterion: "mse",
            impurity: 604445466829.3643,
            samples: 208,
            value: [1877948.4615384615]
          },
          right: {
            id: 52,
            criterion: "mse",
            impurity: 432306250000.0,
            samples: 2,
            value: [6227500.0]
          }
        },
        right: {
          id: 53,
          feature: "grade",
          rule: "<=",
          value: 11.5,
          mse: 133294230881.83618,
          samples: 298,
          left: {
            id: 54,
            criterion: "mse",
            impurity: 89521633802.1853,
            samples: 257,
            value: [1114967.073929961]
          },
          right: {
            id: 55,
            criterion: "mse",
            impurity: 143595117257.46533,
            samples: 41,
            value: [1668327.5609756098]
          }
        }
      },
      right: {
        id: 56,
        feature: "sqft_living",
        rule: "<=",
        value: 7195,
        mse: 1324990993607.2676,
        samples: 34,
        left: {
          id: 57,
          feature: "lat",
          rule: "<=",
          value: 47.5787,
          mse: 548993495600.0,
          samples: 30,
          left: {
            id: 58,
            criterion: "mse",
            impurity: 387645971074.3799,
            samples: 11,
            value: [2315227.272727273]
          },
          right: {
            id: 59,
            criterion: "mse",
            impurity: 371033244819.9453,
            samples: 19,
            value: [3175521.052631579]
          }
        },
        right: {
          id: 60,
          feature: "grade",
          rule: "<=",
          value: 11.5,
          mse: 830028866875.0,
          samples: 4,
          left: {
            id: 61,
            criterion: "mse",
            impurity: 0.0,
            samples: 1,
            value: [7062500.0]
          },
          right: {
            id: 62,
            criterion: "mse",
            impurity: 70143608888.88281,
            samples: 3,
            value: [5026266.666666667]
          }
        }
      }
    }
  }
};
