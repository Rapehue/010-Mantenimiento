import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks";

export const UserCard = ( user ) => {

  const { id
    , codigo
    , nombre_completo
    , departamento
    , photourl = 'https://ae01.alicdn.com/kf/S865539917a1f49398b01dffc3c7a06969/Pegatinas-de-coche-de-personaje-de-dibujos-animados-Avatar-Angry-Ken-bloque-de-Calavera-personalidad-pegatina.jpg'
   } = user;

  const { activeDelivery, activeTask } = useSelector( state => state.mantenimiento );

  const { data: data_user, hasError: hasError_user, isLoading: isLoading_user } = useFetch( `http://localhost:3001/obtenerusuarios` );
  const [delivery, setDelivery] = useState([activeDelivery]);
  const [deliveryMod, setDeliveryMod] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState();

  const dispatch = useDispatch();

  // var activeUser = [];

  // useEffect(() => {
    
  //   if ( activeUser.length > 0 )
  //   {
  //     console.log ( activeUser );

  //     setDeliveryMod(delivery.map(item => {
  //       return { ...item
  //         , codigo_responsable_entregable: activeUser[0].codigo_responsable_entregable
  //         , nombre_completo_responsable_entregable: activeUser[0].nombre_completo_responsable_entregable
  //         , departamento_responsable_entregable: activeUser[0].departamento_responsable_entregable
  //         , area_responsable_entregable : activeUser[0].area_responsable_entregable
  //         };
  //     }));
  //   }
  // }, [deliveryMod])
  

  useEffect(() => {
    
    if ( nuevoUsuario != null )
    {
      const activeUser = data_user.find ( data_user => data_user.id === parseInt(nuevoUsuario) )

      setDeliveryMod(delivery.map(item => {
        return { ...item
          , id_responsable_entregable : parseInt(nuevoUsuario)
          // , nombre_completo_responsable_entregable: activeUser.nombre_completo
          // , departamento_responsable_entregable: activeUser.departamento
          // , area_responsable_entregable : activeUser.area
        };
      }));

      console.log ({ deliveryMod })

      // dispatch (setActiveDelivery( deliveryMod[0] ));
    }
    
  }, [nuevoUsuario])
  
  const onHandleSeleccionar = ( event ) => {

    console.log ({ delivery });
    event.preventDefault();

    setNuevoUsuario( event.target.id );

  };

  return (
  <>
    <div className="col-12"
    >
        <div className="card-per-modal"
          style={{ 
            alignContent: 'center',
          }}
        >
            <div className="row no-gutters">
                <div 
                    className="col-1"
                    style={{ 
                        textAlign: 'center', 
                    }}
                >
                    <img 
                        src= { photourl } 
                        alt={ codigo } 
                        title= { nombre_completo }
                        className="card-img" 
                        style={{
                            maxHeight: "30",
                            maxWidth: "30px",
                            borderRadius: '15px'
                    }}/>
                </div>

                <div className="col-11">
                  <div className="d-flex align-items-center">
                    <div className="col-2">
                      { codigo } 
                    </div>
                    <div className="col-5">
                      { nombre_completo }
                    </div>
                    <div className="col-3">
                      { departamento } 
                    </div>
                    <div className="col-2">
                      <button 
                          id= { id }
                          className="btn btn-outline-danger btn-sm"
                          disabled={ id === activeDelivery.id_responsable_entregable || id === 0 }
                          onClick={ (e) => onHandleSeleccionar(e) }
                      >
                          Seleccionar
                      </button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}
