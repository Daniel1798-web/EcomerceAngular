const {Observable} = require('rxjs');

const {filter} = require("rxjs/operators")


const doSomething = ()=>{
  return new Promise((resolve) =>{
    resolve('valor1');
    setTimeout(()=>{
      resolve('valor3')

    },3000)

  });
}

(async () =>{
  const rta = await doSomething();
  console.log(rta);
})();


const doSomething$ = ()=>{
  return new Observable((Observer) =>{
    Observer.next("valor1$")
    setTimeout(()=>{
      Observer.next('valor3')
      Observer.next(null)

    },5000)
    setTimeout(()=>{
      Observer.next(null)

    },8000)
    setTimeout(()=>{
      Observer.next('valor5$')

    },10000)
  })
}

(() =>{
  const ob$ = doSomething$();
  ob$
  .pipe(
    filter(value => value !=null))
  .subscribe( rta =>{
    console.log(rta)
  })
})();
