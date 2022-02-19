for(let i = 0; i < 256 ; i++) {
  console.log("VALUE: " + i)
  for(let j = 1; j<9 ; j++) {
    console.log("BIT " + j + ":" )
    console.log((i&(2**(j-1))) == (2**(j-1)) )
  }
}
