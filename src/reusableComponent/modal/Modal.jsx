import React from 'react';
import './modal.css'

export default function Modal({open,data, handleModalTogle}) {
  if(!open) return null
  
  return (
    <>
      <div className="overlay" onClick={null}>
        <div className='modal'>
          <div className="closeButton" onClick={handleModalTogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
          <div className="head">
              <div className="image">
                  <img src={data.images.SMALL.url} alt="" />
              </div>
              <div className="info">  
                  <p className="recipeName">
                      {data.label}
                  </p>
                  <p className="dishType">
                      {data.dishType}
                  </p>
                  <p className="dietLabels">
                      {`${data.dietLabels.join(', ')} ${data.healthLabels.join(', ')}`}
                  </p>
              </div>
          </div>
          <div className="body">
              <div className="nutrients">
                  Nutrients
              </div>
              <div className="nutrientsValue">
                  <div className="left">
                      <div className="container">
                        <p className='calories'>Calories:</p>
                        <p className='caloriesValue'>{data.calories.toFixed(3)}</p>             
                      </div>
                  </div>
                 <div className="middle">
                    <div className="container">
                            <p className='digest'>{data.digest[2].label}:</p>
                            <p className='value'>{data.digest[2].total.toFixed(3) + data.digest[2].unit}</p>
                        </div>
                        <div className="container">
                            <p  className='digest'>{data.digest[1].label}:</p>
                            <p className='value'>{data.digest[1].total.toFixed(3) + data.digest[1].unit}</p>
                        </div>
                        <div className="container">
                            <p  className='digest'>{data.digest[0].label}:</p>
                            <p className='value'>{data.digest[0].total.toFixed(3) + data.digest[0].unit}</p>
                        </div>
                  </div>
                  <div className="end">
                      <div className="container">
                          <p className='totalNutrients'>{data.totalNutrients.CA.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CA.quantity)+data.totalNutrients.CA.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.CHOCDF.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CHOCDF.quantity)+data.totalNutrients.CHOCDF.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.CHOLE.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CHOLE.quantity)+data.totalNutrients.CHOLE.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.FE.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.FE.quantity)+data.totalNutrients.FE.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.K.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.K.quantity)+data.totalNutrients.K.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.MG.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.MG.quantity)+data.totalNutrients.MG.unit}</p>
                      </div>  
                  </div> 
              </div>
          </div>
          <div className="footer">
            <p className="ingredients">
                Ingredients
            </p>
              <p className="value">
                  {data.ingredientLines}
              </p>
          </div>
        </div>
      </div>
      
    </>
  )
}
