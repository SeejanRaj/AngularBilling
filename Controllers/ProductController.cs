using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularBilling.Data;
using AngularBilling.Models;
using Microsoft.AspNetCore.Authorization;

namespace AngularBilling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "RequireLoggedIn")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        //[Authorize(Policy = "RequireLoggedIn")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductModel>> GetProductModel(int id)
        {
            var productModel = await _context.Products.FindAsync(id);

            if (productModel == null)
            {
                return NotFound();
            }

            return productModel;
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        //[Authorize(Policy = "RequireLoggedIn")]
        public async Task<IActionResult> PutProductModel(int id, ProductModel productModel)
        {
            if (id != productModel.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(productModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        [HttpPost]
       // [Authorize(Policy = "RequireLoggedIn")]
        public async Task<ActionResult<ProductModel>> PostProductModel(ProductModel productModel)
        {
            _context.Products.Add(productModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductModel", new { id = productModel.ProductId }, productModel);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
       // [Authorize(Policy = "RequireLoggedIn")]
        public async Task<ActionResult<ProductModel>> DeleteProductModel(int id)
        {
            var productModel = await _context.Products.FindAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }

            _context.Products.Remove(productModel);
            await _context.SaveChangesAsync();

            return productModel;
        }

        private bool ProductModelExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
