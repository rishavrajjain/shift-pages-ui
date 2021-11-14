import React,{ useState,useContext, Fragment} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import {toast} from 'react-toastify';
import './invoices.css';




class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {

                const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
                
                return toBase64(file).then(cFile=>{

                    const index=cFile.search("base64,")
                    const image=cFile.slice(index+7);
                    const formData=new FormData();
                    console.log(image)
                    formData.append('image',image);
                    return  axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_UPLOAD_API_KEY}`,formData).then((d) => {
                        if (d.status) {
                            this.loader.uploaded = true;
                            resolve( {
                                default: d.data.data.url
                            } );
                        } else {
                            reject(`Couldn't upload file: ${ file.name }.`)
                        }
                    }).catch(err=>{
                        console.log(err.message);
                    });
                })
                
            } ) );
    }

   
}

function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader );
    };
}



const CreateInvoice = (props) => {
    
    

    const [content,setContent]=useState("");
    const [contentTitle,setContentTitle]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const token= localStorage.getItem('shift-pages-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    

    
    const [price,setPrice]=useState(0);
    const [details,setDetails]=useState({
        name:'',
        email:'',
        address:'',
        phoneNumber:''
    })

    const onChangeDetails = e => setDetails({ ...details, [e.target.name]: e.target.value });
    

    const createInvoice=async ()=>{

        if(contentTitle === ""){
            toast.error('Title Cannot be empty.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }

        if(content === ""){
            toast.error('Content Cannot be empty.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }

        const {name,address,phoneNumber,email}=details;

        if(name ==='' || address === '' || phoneNumber ==='' || email ==='' ){
            toast.error('Please fill all the details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        
        setIsLoading(true);
        
        
        try{
            const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/createInvoice`,{
                title:contentTitle,
                details:content,
                amount:price,
                name,
                address,
                phoneNumber,
                email
            },config)
            setContent(" ");
            setContentTitle(" ");
            setPrice(0);
            console.log(res);
            
           
            setIsLoading(false);
            props.history.push('/invoices')
            toast.success('🦄 Invoice created successfully !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            
        }catch(err){
            console.log(err)
            toast.error('Error.Something went wrong.Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
    }

    const onChange=(e)=>{
        setContentTitle(e.target.value)
    }

   
    const onChangePrice = (e)=>{
        setPrice(e.target.value)
    }
    return isLoading?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <div>
            <Navbar style={{marginBottom:'2rem'}}/>
            <div class="container" style={{marginTop:'5rem'}}>

            <div class="section-title-pages">
          <h3><i className="fa fa-book"></i><span>{'  '}Invoices</span></h3>
          
        </div>
            
            
            
            <input type="text" class="form-control" placeholder="Enter Title" value={contentTitle} onChange={onChange} style={{marginBottom:'2rem'}}/>
            <div className="row">
               
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Name"  onChange={onChangeDetails} name="name" style={{marginBottom:'2rem'}}/>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email"  onChange={onChangeDetails} name="email" style={{marginBottom:'2rem'}}/>
                </div>
            
            
            </div>
            <hr></hr>
            
            <div className="row">
               
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <label>Price</label>
                    <input type="number" class="form-control" placeholder="Enter Amount" value={price} onChange={onChangePrice} style={{marginBottom:'2rem'}}/>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <label>Phone Number</label>
                <input type="text" class="form-control" placeholder="Enter Phone Number" name="phoneNumber"  onChange={onChangeDetails} style={{marginBottom:'2rem'}}/>
                </div>
            
            
            </div>
            <hr></hr>
            <textarea type="text" class="form-control" placeholder="Address" rows="5"  onChange={onChangeDetails} name="address" style={{marginBottom:'2rem'}}/>
            <div className="row">
            <div className="col-xl-12">
            <label>Details</label>
            <CKEditor
            editor={ ClassicEditor }
            data={content}
            config={{
                extraPlugins: [ MyCustomUploadAdapterPlugin ],
                removePlugins: ['MediaEmbed','Table'] 
            }}
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setContent(data)
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
        />
        </div>
            
            </div>
            
            
            
        <button className="btn btn-block" style={{marginTop:'2rem',backgroundColor:'rgba(86, 58, 250, 0.9)',color:'white'}} onClick={createInvoice}>Create Invoice</button>
        </div>
        </div>
        
    )
}

export default CreateInvoice;