import { createContext } from "react";

const MyContext = createContext({
    name:"xioaming",//默认值，不用Provider时使用
    count:1
})

export default MyContext