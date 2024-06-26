import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: "none !important"
  },
}))

export default function DefaultPagination (props) {
  const {onPageChange, totalCount, page} = props
  const classes = useStyles()
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TablePagination 
          rowsPerPageOptions={[10]}
          component="div"
          count={parseInt(totalCount)}
          rowsPerPage={10}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  )
}
