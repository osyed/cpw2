

var blake = require('blakejs')
var bip39 = require('bip39')

var streatch = 10

/*
var b = blake.blake2bHex('this is a test')
console.log(b)
var m = bip39.entropyToMnemonic(b)
console.log(m)
*/

global.doit =  function(){
  var dox = document.getElementById("image-file")
  var d = dox.files[0]
  document.getElementById("show").value = 'working ...'
  if (d){ getAsText(d, "utf-8", doit2) }
  else{ doit2('') }
}

function getAsText(e, enc, cb){
  console.log('reading file')
  var reader = new FileReader()
  reader.readAsText(e, enc)
  reader.onload = function(evt){ cb(evt.target.result) }
  reader.onerror = function(evt){ alert('error reading file'); cb('') }
}

function doit2(d){
  console.log('hashing')
  var s = document.querySelector('input[name=bits]:checked').value
  var p = document.getElementById("pin").value
  p = p.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, '').toLowerCase()
  s = s/4
  var b = blake.blake2bHex(p+d)
  for(var i=0; i<streatch; i++){
    b = blake.blake2bHex(b+p+d)
  }
  b = b.substr(0, s)
  var m = bip39.entropyToMnemonic(b)
  document.getElementById("show").value = m+'\n\n'+b
}

global.dosite =  function(){
  var d = document.getElementById("show").value
  var p = document.getElementById("site").value
  var s = document.querySelector('input[name=bits2]:checked').value
  p = p.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, '').toLowerCase()
  s = s/4
  d = d.split(/\n+/)
  document.getElementById("show2").value = ''
  try{
    d = bip39.mnemonicToEntropy(d[0])
  }
  catch(e){
    alert('error in pass phrase'); return 
  }
  var b = blake.blake2bHex(p+d)
  b = b.substr(0, s)
  var m = bip39.entropyToMnemonic(b)
  document.getElementById("show2").value = m+'\n\n'+b
}

