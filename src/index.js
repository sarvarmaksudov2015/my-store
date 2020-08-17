import React, {useState} from "react";
import ReactDOM from "react-dom";
import {css} from './index.css'
import {FaAngellist} from 'react-icons/fa'
import {FaApple} from 'react-icons/fa'
// import PRODUCTS from './products';


const ProductCategoryRow = props => {
	const { product } = props;

	return (
		<tr>
			<th colSpan="2">
				{product.category}
			</th>
		</tr>
	);
};

const ProductRow = props => {
	const { product } = props;
	const coloredName = product.stocked ?
		product.name :
		<span style={{ color: "red" }}>{product.name}</span>;

    const coloredPrice = product.stocked ?
      product.price :
      <span style={{ color: "red" }}>{product.price}</span>;

	return (
		<tr>
			<td>{coloredName}</td><td align="right">{coloredPrice}</td>
		</tr>
	);
};

const ProductTable = props => {
	const { filterText, inStockOnly, products } = props;
	const rows = [];
	let lastCategory = null;

	products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					product={product}
					key={product.category}
				/>
			);
		}
		rows.push(<ProductRow product={product} key={product.name} />);
		lastCategory = product.category;
	});

	return (
		<table width="50%">
			<thead>
				<tr style={{ color: "blue" }}>
					<th align="left">Name</th><th align="right">Price</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
};

const SearchBar = props => {
  const {
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
  } = props;




	return (
		<form id="search">
			<input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={event => onFilterTextChange(event.target.value)}
        />
			<p>
				<input
        type="checkbox"
        checkbox={inStockOnly}
        onChange={event => onInStockOnlyChange(event.target.checked)}
        />
				{" "}
				<span style={{ color: "green", fontSize: "smaller" }}>
					Only show products in stock
				</span>
			</p>
		</form>
	);
};

const FilterableProductTable = props => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(true);
	const { products } = props;

  const handleFilterTextChange = filterText => {
    setFilterText(filterText);
  };

  const handleInStockOnlyChange = inStockOnly => {
    setInStockOnly(inStockOnly);
  };


	return (
		<div style={{ fontFamily: "sans-serif" }}>
    <div className="icons">
    <FaAngellist color="purple" size="5rem" />
    <FaApple color="yellow" size="6rem" />
    </div>
			<SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockOnlyChange={handleInStockOnlyChange}
      />

			<ProductTable products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
       />
		</div>
	);
};



const PRODUCTS = [
  {
    category: "Furniture",
    price: "$289.00",
    stocked: true,
    name: "Beds",
  },
  {
    category: "Furniture",
    price: "$59.00",
    stocked: true,
    name: "Table",
  },
  {
    category: "Furniture",
    price: "$629.00",
    stocked: false,
    name: "Sofa",
  },
  {
    category: "Furniture",
    price: "$29.00",
    stocked: true,
    name: "Chair",
  },
  {
    category: "Furniture",
    price: "$99.00",
    stocked: false,
    name: "Dresser",
  },
  {
    category: "Furniture",
    price: "$49.00",
    stocked: true,
    name: "Bookshelf",
  },

  {
    category: "Electronics",
    price: "$429.00",
    stocked: true,
    name: "Tv Samsung 50 inch",
  },
  {
    category: "Electronics",
    price: "$399.00",
    stocked: true,
    name: "HP Laptop",
  },
  {
    category: "Electronics",
    price: "$239.00",
    stocked: true,
    name: "HP Printer",
  },
  {
    category: "Electronics",
    price: "$79.00",
    stocked: false,
    name: "Wi-Fi Router",
  },
  {
    category: "Electronics",
    price: "$479.00",
    stocked: true,
    name: "Apple IPhone 7",
  },
  {
    category: "Electronics",
    price: "$569.00",
    stocked: true,
    name: "Apple IPad 3",
  },

  {
    category: "Fruits",
    price: "$3.00lb",
    stocked: true,
    name: "Grapes",
  },
  {
    category: "Fruits",
    price: "$1.99lb",
    stocked: true,
    name: "Apple",
  },
  {
    category: "Fruits",
    price: "$4.39",
    stocked: false,
    name: "Strawberry",
  },
  {
    category: "Fruits",
    price: "$0.69",
    stocked: true,
    name: "Banana",
  },
  {
    category: "Fruits",
    price: "$2.09",
    stocked: true,
    name: "Kiwi",
  },
  {
    category: "Fruits",
    price: "$1.29",
    stocked: true,
    name: "Peach",
  }
];



ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />,
	document.getElementById("root")
);
