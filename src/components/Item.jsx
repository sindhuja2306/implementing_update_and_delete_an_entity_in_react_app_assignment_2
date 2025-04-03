const Item = ({ item, onDelete}) => {

    // Render a single item
    // Add a Delete and Edit button
    return (
        <li>
            {item.name}
            <button onClick={()=> onDelete(item.id)}>Delete</button>
        </li>
    );
};

export default Item;
