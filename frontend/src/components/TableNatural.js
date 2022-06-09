import * as React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, makeStyles ,TableContainer , Paper , TablePagination } from '@material-ui/core'
import { useEffect,useState} from 'react';
import axios from "axios";
import "./Table.css"
import { Cancel } from "@material-ui/icons"
import { Star } from "@material-ui/icons";




function Tablenaturals({setShowtablenatural}) {
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
    const[naturals,setNaturals] = useState([]);
    const Naturals= async ()=>{
        try{
            const res =await axios.get("/naturals");
            setNaturals(res.data);
        }catch(err){
            console.log(err);
        }
      }
    useEffect(()=>{
        const getNaturals= async ()=>{
          try{
              const res =await axios.get("/naturals");
              setNaturals(res.data);
          }catch(err){
              console.log(err);
          }
        };
        getNaturals()
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
                    <TableCell align="center">Place name TH</TableCell>
                    <TableCell align="center">Place name EN</TableCell>
                    <TableCell align="center">Latitude</TableCell>
                    <TableCell align="center">Longitude</TableCell>
                    <TableCell align="center">Description</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {naturals
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((naturals)=>(
                    
        <TableRow  className={classes.row} key={naturals._id} >
        <TableCell>{naturals.namenatth}</TableCell>
        <TableCell>{naturals.namenat}</TableCell>
        <TableCell>{naturals.long}</TableCell>
        <TableCell>{naturals.lat}</TableCell>
        <TableCell>{naturals.description}</TableCell>
        </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[1,3,5]}
        component="div"
        count={naturals.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Cancel className="tableCancel" onClick={()=>setShowtablenatural(false)}/>
    </Paper>
    </div>
  
   
    
  );
}

export default React.memo(Tablenaturals);