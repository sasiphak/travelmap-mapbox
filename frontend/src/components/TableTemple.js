import * as React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, makeStyles ,TableContainer , Paper , TablePagination } from '@material-ui/core'
import { useEffect,useState} from 'react';
import axios from "axios";
import "./Table.css"
import { Cancel } from "@material-ui/icons"
import { Star } from "@material-ui/icons";




function Tabletemples({setShowtabletemple}) {
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
    const[temples,setTemples] = useState([]);
    const Pins= async ()=>{
        try{
            const res =await axios.get("/temples");
            setTemples(res.data);
        }catch(err){
            console.log(err);
        }
      }
    useEffect(()=>{
        const getTemples= async ()=>{
          try{
              const res =await axios.get("/temples");
              setTemples(res.data);
          }catch(err){
              console.log(err);
          }
        };
        getTemples()
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
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Business hours</TableCell>
                    <TableCell align="center">Tel</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {temples
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((temples)=>(
                    
        <TableRow  className={classes.row} key={temples._id} >
        <TableCell>{temples.nametemth}</TableCell> 
        <TableCell>{temples.nametemen}</TableCell>
        <TableCell>{temples.address}</TableCell>
        <TableCell>{temples.description}</TableCell>
        <TableCell>{temples.businesshours}</TableCell>
        <TableCell>{temples.tel}</TableCell>
        </TableRow>
                ))}
            </TableBody>
             
        </Table>
        </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[1,3,5]}
        component="div"
        count={temples.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Cancel className="tableCancel" onClick={()=>setShowtabletemple(false)}/>
    </Paper>
    </div>
  
   
    
  );
}

export default React.memo(Tabletemples);