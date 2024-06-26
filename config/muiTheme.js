import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#424242',
      main: '#fff',
      dark: '#242424'
    },
    secondary: {
      light: "#F46565",
      main: '#FF4141',
      dark: "#AC2323"
    },
  },
  typography: {
    useNextVariants: true,
    h1: {
      color: "#4D4F5C",
      fontSize: "35px",
      fontFamily: "'Muli', sans-serif",
      fontWeight: 900,
      letterSpacing: "0.3px",
      textTransform: "uppercase"
    },
    h4: {
      fontSize: "18px",
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 500,
      lineHeight: "21px",
      textTransform: "initial",
      color: "#6F7071"
    },
    subtitle1: {
      color: "#4D4F5C",
      fontSize: "16px",
      fontFamily: "'Roboto', sans-serif",
      fontWeight: "500"
    },
    subtitle2: {
      fontSize: "14px",
      fontFamily: "'Roboto', sans-serif",
      fontWeight: "400",
      color: "#1F1F20"
    }
  },
  overrides: {
    MuiButton: {
      label: {
        fontSize: "12px",
        fontFamily: "'Muli', sans-serif"
      },
      containedPrimary: {
        color: "white",
        height: "33px"
      }
    },
    MuiInputLabel: {
      root: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16px",
        color: "#6F7071",
        fontWeight: "400",
        WebkitFontSmoothing: "antialiased",
        "&$focused": {
          "color": "red !important"
        }
      }
    },
    MuiInputBase: {
      input: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16px",
        color: "#1F1F20",
        fontWeight: "400",
        WebkitFontSmoothing: "antialiased"
      },
      root: {
        marginTop: "16px"
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid red !important"
        }
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "red !important"
        }
      }
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(247, 73, 73, 0.38)",
        "&:hover": {
          backgroundColor: "rgb(247, 73, 73) !important",
          color: "white"
        }
      },
      deleteIcon: {
        color: "rgba(152, 0, 0, 0.47) !important"
      }
    },
    MuiCard: {
      root: {
        padding: "20px 30px",
        marginBottom: "20px",
        boxShadow: "0px 3px 6px #9D1E1E0D",
        borderRadius: "6px !important"
      }
    },
    MuiCardContent: {
      root: {
        padding: 0,
        paddingBottom: "0 !important"
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: "6px"
      }
    },
    MuiTableCell: {
      head: {
        color: "#0000008F"
      },
      root: {
        borderBottom: "1px solid #E0E0E0",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: "14px"
      }
    },
    MuiTableSortLabel: {
      icon: {
        width: "14px"
      }
    },
    MuiTablePagination: {
      caption: {
        color: "#0000008A",
        fontSize: "14px",
        fontFamily: "'Source Sans Pro', sans-serif"
      },
      select: {
        fontSize: "14px",
        color: "#0000008A",
        fontFamily: "'Source Sans Pro', sans-serif"
      },
      selectRoot: {
        marginTop: "0"
      },
      actions: {
        color: "#0000008A"
      }
    },
    MuiTreeView: {
      root: {
        color: "#6F7071"
      }
    },
    MuiTreeItem: {
      root: {
        padding: "4px 0"
      }
    },
    MuiExpansionPanel: {
      root: {
        boxShadow: "0px 3px 6px #9D1E1E0D",
        borderRadius: "6px",
        marginBottom: "12px !important",
        "&:before": {
          content: "none"
        }
      },
      rounded: {
        borderRadius: "6px"
      }
    }
  }
});

export default theme;