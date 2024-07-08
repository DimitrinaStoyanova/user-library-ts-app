import { Control, FieldErrors, SetFieldValue } from "react-hook-form"

export type GeoAaddress = {
    lat: string,
    lng: string
}

export type Address = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoAaddress
}

export type Company = {
    name: string,
    catchPhrase: string,
    bs: string
}


export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company
}

export type UserArticle = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type NewUserArticle = Omit<UserArticle, "id">;

export type PopupMode = "CREATE" | "UPDATE" | "DELETE";

export type UserArticleFormProps = {
    control: Control<UserArticle | NewUserArticle>;
    errors: FieldErrors<UserArticle | NewUserArticle>;
    setValue?: SetFieldValue<UserArticle | NewUserArticle>
}