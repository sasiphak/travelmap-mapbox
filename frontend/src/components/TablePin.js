import * as React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, makeStyles ,TableContainer , Paper , TablePagination } from '@material-ui/core'
import { useEffect,useState} from 'react';
import axios from "axios";
import "./Table.css"
import { Cancel } from "@material-ui/icons"
import { Star } from "@material-ui/icons";




function Tablepins({setShowtablepin}) {
    const useStyles = makeStyles({
        table: {
            width: '100%',
        },
        thead: {
            '& > *': {
                fontSize: 15,
                background: '#40E0D0',
                color: '#FFFF'
                
            }
        },
        row: {
            '& > *': {
                fontSize: 12
            }
        }
    })

    const classes = useStyles();
    const[pins,setPins] = useState([]);
    const Pins= async ()=>{
        try{
            const res =await axios.get("/pins");
            setPins(res.data);
        }catch(err){
            console.log(err);
        }
      }
    useEffect(()=>{
        const getPins= async ()=>{
          try{
              const res =await axios.get("/pins");
              setPins(res.data);
          }catch(err){
              console.log(err);
          }
        };
        getPins()
      },[]);
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

  return (
      
    <div className="Table">  
     <Paper sx={{ width: '100%' }}>
          
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Revirw</TableCell>
                    <TableCell align="center">____Rating____</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Time</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {pins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p)=>(
                    
        <TableRow  className={classes.row} key={p._id} >
        <TableCell>{p.title}</TableCell> 
        <TableCell>{p.desc}</TableCell>
        <TableCell>
        {Array(p.rating).fill(<Star className="rating" />)}
        </TableCell>
        <TableCell>{p.username}</TableCell>
        <TableCell>{p.createdAt}</TableCell>
        </TableRow>
                ))}
            </TableBody>
             
        </Table>
        </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[1,3,5]}
        component="div"
        count={pins.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Cancel className="tableCancel" onClick={()=>setShowtablepin(false)}/>
    </Paper>
    </div>
  
   
    
  );
}

export default React.memo(Tablepins);