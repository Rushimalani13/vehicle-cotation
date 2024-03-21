
'use client'
import Image from 'next/image'
import vehicles from '../vehicleapi/vechiledata.json'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


export default function cotation_review() {

  const getLocalItem = ()=>{
    const storelocaltodo= localStorage.getItem("userinfo");
    return storelocaltodo?JSON.parse(storelocaltodo):[];
  }
  
  function getVehicleById(id) {
    return vehicles.find(vehicle => vehicle.id === id);
  }

  const { push } = useRouter();
  const sendCotation = () => {
    alert('Coatation Send Succesfully!!');
    push('/');
  }  
  const data=getLocalItem(); 

  const idToFind = data.vechileModel; 
  const foundVehicle = getVehicleById(idToFind);

  if (foundVehicle) {
    console.log("Vehicle found:", foundVehicle);
  } else {
    console.log("Vehicle not found with ID:", idToFind);
  }

  return (
    <>
 
     <div className="flex justify-center item    s-center h-full w-full p-16">
      <ul>
      <h1 className="text-green-700">Review Details</h1>
        <hr/>
        <li>Customer Name: <b>{data.cutomerName}</b></li>
        <li>Customer Email: <b>{data.emailAddress}</b></li>
        <li>Vechile Type: <b>{data.vehiclesTypes}</b></li>
        <li>Vechile Model: <b>{data.vechileModel}</b></li>
        <Image src={foundVehicle.imagurl} width={400} height={400} alt="Picture of the author"/>
        <li>Make: <b>{foundVehicle.make}</b></li>
        <li>Model: <b>{foundVehicle.model}</b></li>
        <li>Year: <b>{foundVehicle.year}</b></li>
        <li>Color: <b>{foundVehicle.color}</b></li>
        <hr/>
        <li>Base Price: {foundVehicle.base} </li>
        <li>Accesories: {foundVehicle.accessories}</li>
        <li>Tax: {foundVehicle.Tax}</li>
        <hr />
        <li>Total Price: <b>{foundVehicle.base+foundVehicle.accessories+foundVehicle.Tax}</b></li>
        <Button onClick={sendCotation} className='m-4'>Send Cotation</Button>
      </ul>
     </div>
    </>
  )
}
