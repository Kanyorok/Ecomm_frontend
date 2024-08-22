import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct, clearErrors } from '../../redux/actions/productAction';
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('safiri');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [badge, setBadge] = useState(false);
    const [color, setColor] = useState('');
    const [productSection, setProductSection] = useState('new collection');
    const [specifications, setSpecifications] = useState([{ label: '', value: '' }]);
    const [brand, setBrand] = useState('');
    const navigate = useNavigate();

    const categories = ['safiri', 'everyday bags', 'laptop', 'travel'];
    const productSections = ['new collection', 'general', 'best seller'];
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/admin/products');
            toast.success('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const handleSpecificationChange = (index, event) => {
        const values = [...specifications];
        values[index][event.target.name] = event.target.value;
        setSpecifications(values);
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { label: '', value: '' }]);
    };

    const removeSpecification = index => {
        const values = [...specifications];
        values.splice(index, 1);
        setSpecifications(values);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('oldPrice', oldPrice);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('badge', badge);
        formData.set('color', color);
        formData.set('product_section', productSection);
        formData.set('brand', brand);

        specifications.forEach((spec, index) => {
            formData.set(`specifications[${index}][label]`, spec.label);
            formData.set(`specifications[${index}][value]`, spec.value);
        });
         

        images.forEach(image => {
            formData.append('images[]', image);
          });
        // images.forEach(image => {
        //     formData.append('images', image);
        // });
        
        dispatch(newProduct(formData));
        
    };

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }
    
    

    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="flex flex-row">
                <div className="w-1/6 mr-5 md:w-1/5">
                    <Sidebar />
                </div>

                <div className="w-5/6">
                    <Fragment>
                        <div className="my-5">
                            <form className="shadow-lg p-8 bg-white rounded" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4 text-2xl font-bold">New Product</h1>

                                <div className="mb-4">
                                    <label htmlFor="name_field" className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="price_field" className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        id="price_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="oldPrice_field" className="block text-gray-700">Old Price</label>
                                    <input
                                        type="number"
                                        id="oldPrice_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={oldPrice}
                                        onChange={(e) => setOldPrice(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description_field" className="block text-gray-700">Description</label>
                                    <textarea
                                        id="description_field"
                                        rows="8"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category_field" className="block text-gray-700">Category</label>
                                    <select
                                        id="category_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="stock_field" className="block text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="seller_field" className="block text-gray-700">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="badge_field" className="block text-gray-700">Badge</label>
                                    <select
                                        id="badge_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={badge}
                                        onChange={(e) => setBadge(e.target.value)}>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="color_field" className="block text-gray-700">Color</label>
                                    <input
                                        type="text"
                                        id="color_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="product_section_field" className="block text-gray-700">Product Section</label>
                                    <select
                                        id="product_section_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={productSection}
                                        onChange={(e) => setProductSection(e.target.value)}>
                                        {productSections.map(section => (
                                            <option key={section} value={section}>{section}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="brand_field" className="block text-gray-700">Brand</label>
                                    <input
                                        type="text"
                                        id="brand_field"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Images</label>
                                    <input
                                        type="file"
                                        name="product_images"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        id="customFile"
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label htmlFor="customFile" className="block mt-2 text-gray-500">Choose Images</label>
                                    <div className="flex mt-2">
                                        {imagesPreview.map(img => (
                                            <img
                                                src={img}
                                                key={img}
                                                alt="Images Preview"
                                                className="w-14 h-14 mr-2"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Specifications</label>
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="flex mb-2">
                                            <input
                                                type="text"
                                                name="label"
                                                value={spec.label}
                                                onChange={e => handleSpecificationChange(index, e)}
                                                placeholder="Label"
                                                className="w-1/2 p-2 border border-gray-300 rounded mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="value"
                                                value={spec.value}
                                                onChange={e => handleSpecificationChange(index, e)}
                                                placeholder="Value"
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpecification(index)}
                                                className="ml-2 p-2 bg-red-500 text-white rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="p-2 bg-blue-500 text-white rounded"
                                    >
                                        Add Specification
                                    </button>
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? 'Creating...' : 'CREATE'}
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
