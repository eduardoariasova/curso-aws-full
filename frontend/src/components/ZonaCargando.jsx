import {BounceLoader} from 'react-spinners';


function ZonaCargando(){

    return(
        <div className="overlayCargando" >
            <BounceLoader color='#0E1465'size={15} />
        </div>
    )
}

export default ZonaCargando;