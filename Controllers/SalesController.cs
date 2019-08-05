using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularBilling.Data;
using AngularBilling.Models;

namespace AngularBilling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SalesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesModel>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesModel>> GetSalesModel(int id)
        {
            var salesModel = await _context.Sales.FindAsync(id);

            if (salesModel == null)
            {
                return NotFound();
            }

            return salesModel;
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalesModel(int id, SalesModel salesModel)
        {
            if (id != salesModel.SalesId)
            {
                return BadRequest();
            }

            _context.Entry(salesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesModelExists(id))
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

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SalesModel>> PostSalesModel(SalesModel salesModel)
        {
            _context.Sales.Add(salesModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalesModel", new { id = salesModel.SalesId }, salesModel);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalesModel>> DeleteSalesModel(int id)
        {
            var salesModel = await _context.Sales.FindAsync(id);
            if (salesModel == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(salesModel);
            await _context.SaveChangesAsync();

            return salesModel;
        }

        private bool SalesModelExists(int id)
        {
            return _context.Sales.Any(e => e.SalesId == id);
        }
    }
}
