import createWebStorage from "redux-persist/es/storage/createWebStorage";


const createNoopStorage = () => {
    return {
        getItem(){
            return Promise.resolve(null)
        },
        setItem(key: string, value: string){
            return Promise.resolve(value)
        },
        removeItem() {
            return Promise.resolve(null)
        }
    }
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;