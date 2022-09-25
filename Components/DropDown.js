import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';

export default function DropDown(Lista) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  var objetos = []
  useEffect(() => {
    Lista.Lista.forEach(item => {
        let objeto = {label: item, value: item}
        objetos.push(objeto)
      });
      setItems(objetos)
  })
 


  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}