import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export function PickerItem(props) {
    let moedasItem = props.moedas.map((item) => {
        return <Picker.Item key={item.key} label={item.key} value={item.key} />
    });

    return (
        <Picker selectedValue={props.moedaSelecionada}
            onValueChange={(valor) => props.onChange(valor)} >
            {moedasItem}
        </Picker >
    )
}