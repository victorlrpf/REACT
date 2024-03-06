
// eslint-disable-next-line no-unused-vars
export async function watch(zenReq) {
    const zenRes = {
      statusCode: 200,
      body: {},
    };
  
    // POST
  
    // Colocar o codigo do produto filho como uma composição
    // Do codigo do produto mestre e codigo da variante
    // Exemplo: 0002.V1 ou 0002.V2
  
    if(zenReq.body.context.event === "/catalog/product/productPackingCreate") { // capturar o evento
      try{
        const bean = zenReq.body.args.bean;
        const productMaster = bean.product.code; // Capturar o codigo mestre
        const variantCode = bean.variant.code; // Capturar o codigo variante
  
        const productPaking = `${productMaster}.${variantCode}`; // Montar o código do produto filho
        bean.code = productPaking;
  
        zenRes.body.args = bean.code;
  
        fetch("https://teste.zenerp.app.br/catalog/product/productPackingCreate",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productPaking),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro para enviar ${response.status}`);
            }
          })
          .catch(error => {
            console.log("Erro: ", error);
          });
  
        console.log(`${zenRes.body.args}`);
      } catch (err){
        console.log(err);
      }
    }
    return zenRes;
  }
  