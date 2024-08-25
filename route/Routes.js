let express=require('express');
// const { find_all_product, updateproduct, Delete_Product, createproduct, addProduct } = require('../Controller/Productcontroller');
// const ProductController = require('../Controller/ProductControllers');
const { damage_create_product, delete_damage_product, damage_update, damage_all_data, damageGetdata } = require('../Controller/damagecontroller');
const varient_product = require('../Controller/Product_varient_controller');
const newoffer = require('../Controller/Offercontroller');
const { purchage,  updatep_purchage, filter_purchage, purchaggetdata, purchage_update, delete_purchage_product, getAllPurchages } = require('../Controller/Purchage_Controllers');
const { new_stock_product, updated_stock, Stock_Purchage_delete } = require('../Controller/Stock_controller/Stockauth');



// --------------------Employees-----------------

const { newemployess, getAllEmployees, deleteEmployees, updateEmployees, filterEmployee, viewEmployees } = require('../Controller/Employees');
const { createdaddress, FindAllAddress } = require('../Controller/EmployeeAddressCategory');
const { createdaddressDetails, employAllAddress } = require('../Controller/EmployAddress');


// ----------------Customer---------------------------

const { newCustomer, getAllCustomer, CustomerFilter, viewCustomer } = require('../Controller/CustomerAdd');
const Administrator = require('../Models/Administrator');


// --------------------administrator---------------------

const { newadministrator, getAlladministrator, updateAdministrator, deleteAdministrator, filterAdministrator, viewAdministrator } = require('../Controller/Administrator');
const { createCategory, deleteCategory, getAllCategories, updateCategory } = require('../Controller/PurchageCategory');
 

const router=express.Router();







// *******************Damage_Product***************************

    router.post('/create-damage', damage_create_product)
    router.delete('/delete/:_id', delete_damage_product)
    router.put('/damage_update/:_id',damage_update)
    router.get('/getaddData',damageGetdata)

//  ******************Varient_Product**************
router.post('/varient_product',varient_product)

// *************Offer********************************

router.post('/offer',newoffer)



// ***********************Purchage******************
router.post('/purchage_create',purchage)
router.delete('/purchage_deleted/:_id',delete_purchage_product)
router.put('/purchage_updated/:_id',purchage_update)
// router.get('/purchageFilter/:key',filter_purchage)
router.get('/purchagefinddata',getAllPurchages)


// ----------------------------PurchageCategory----------------------------
// routes/categoryRoutes.js

// const categoryController = require('../controllers/categoryController'); // Adjust the path as needed

// Route to create a new category
router.post('/categories/create', createCategory);

// Route to delete a category by ID
router.delete('/categories/delete/:_id', deleteCategory);

// Route to get all categories
router.get('/categories/getalldata', getAllCategories);

// Route to update a category by ID
router.put('/categories/update/:_id', updateCategory);





// router.post('/damage_update',purchage.updatep_purchage)


// *******************Stock*************************************

router.post('/stock_create/:_id',new_stock_product)
router.put('/stock_updated/:_id',updated_stock)
router.delete('/stock_delete/:_id',Stock_Purchage_delete)

// ------------------Employees-------------
router.post('/registerEmployee',newemployess)
router.get('/getAllEmployees',getAllEmployees)
router.delete('/deleteEmployees/:_id',deleteEmployees)
router.put('/updateEmployees/:_id',updateEmployees)
router.get('/viewEmployees/id',viewEmployees)

router.get('/filterEmployees',filterEmployee)





// ------------------Employees-Address-Category-------------
router.post('/registerEmployee/:_id',createdaddress)
router.get('/getAllEmployees',FindAllAddress)

router.post('/employeeAddress/:_id',createdaddressDetails)
router.get('/getAllEmployeesAdddress',employAllAddress)


// -----------------Customer------------------

router.post('/addCustomer',newCustomer)
router.get('/getAllCustomer',getAllCustomer)

router.delete('/deleteCustomer/:_id',deleteEmployees)
router.put('/updateCustomer/:_id',updateEmployees)

router.get('/filterCustomer',CustomerFilter)
router.get('/viewCustomer/:id',viewCustomer)




// ----------------Administrator-------------------

router.post('/addAdministrator',  newadministrator)
router.get('/getAllAdministrator',getAlladministrator)

router.delete('/deleteAdministrator/:_id', deleteAdministrator)
router.put('/updateAdministrator/:_id',updateAdministrator)
router.get('/viewAdministrator/:_id',viewAdministrator)




// --------------------Filter-Administrator--------------------------
router.get('/filterAdministrator',filterAdministrator)



   
   







module.exports=router