const Category = require('../../models/category')

module.exports = {
    category_form:async (req,res) => {
        const categories=await Category.find();
        res.render('admin/category/categories',{title:'Admin | Categories',categories:categories})
    },
    submit_category:async (req, res) => {
        const newCategory = new Category({
            name: req.body.category_name,
            description:req.body.description
        });
        const saveCategory = await newCategory.save()
        if (!saveCategory) {
            req.flash('error-message', 'Category creation fail');
            res.redirect('/admin/category_create');
        }
        req.flash('success-message', 'Category created');
        res.redirect('/admin/category_create');
    },
    destroy:async(req,res)=>{
        const id = req.params.id;
        const cat = await Category.findById(id);
        if (!cat) {
            req.flash('error-message', 'Category Not Exit');
            res.redirect('/admin/category_create')
        } else {
            await cat.remove((err, result) => {
                if (err) {
                    req.flash('error-message', 'Category Delete Fail');
                    res.redirect('/admin/category_create')
                } 
                req.flash('success-message', 'Category Deleted');
                res.redirect('/admin/category_create')
            })
        }
    }
}

