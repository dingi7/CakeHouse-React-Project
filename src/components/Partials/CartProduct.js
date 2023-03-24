export const Product = ({name,price,id,img}) => {
    return ( 
        <tr>
        <td>
            <img className="imgCart" src={img} alt="itemImage" />
        </td>
        <td>{name}</td>
        <td>{price.toFixed(2)}лв</td>
    </tr>
    )
}