import { MainKeyQueryParams } from "@/types";

export const mainKeyQueryParams: MainKeyQueryParams[] = ['brand', 'year', 'doors', 'transmission', 'color'];

export const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API;

//================================ main page
export const headquarters = [
    {
        name: "RE AUTOS CDMX",
        addres: "Carr Amomolulco Ocoyoacac, Estado de México, 52740."
    },
    {
        name: "RE AUTOS Monterrey",
        addres: "AV Sin nombre 9087, Guadalupe, Monterrey, 52740"
    },
    {
        name: "RE AUTOS Mérida",
        addres: "Periferico Norte, No.73, Francisco de Montejo, 52740."
    },
    {
        name: "RE AUTOS Guadalajara",
        addres: "Cristobal Colón 6013, San Pedro Tlaquepaque, Jalisco, 45601."
    },
]

//filtersheader component
export const orderOptions = ['Mayor precio', 'Menor precio', 'Más antiguos', 'Más recientes'];

//foooter component
export const socialIcons = ['facebook', 'instagram', 'youtube', 'twitter', 'pinterest', 'linkedin', 'tiktok'];

//searchfilterscont component
export const optionsKey = {
    keyBrand: 'marca',
    keyYear: 'año',
    keyDoors: 'puertas',
    keyTransmission: 'transmision'
}

export const optionsType: string[] = Object.values(optionsKey);