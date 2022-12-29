import {useState, useEffect} from "react";

function App() {
	const [pair, setpair] = useState([]);
	function handleSubmit(e) {
		e.preventDefault();
		var btm = document.getElementById("myform");
		var f = new FormData(btm);
		for(var p of f.entries()){
			console.log(p);
		}
		fetch("http://127.0.0.1:5000/ping",{mode: 'no-cors', body: f, method: "post"})
		.then(function(response){
			console.log(response)
			var data = response.json()
			console.log(data)
			setpair(data)
		});
		btm.reset();
	}
  
  return (
    <div>
		<div className="text-center">
			<form id="myform" method="post" target="table">
				<label htmlFor="s_id">student id:</label>
				<input type="text" id="s_id" name="s_id" />
				<br />
				<label htmlFor="drop_cours">drop course:</label>
				<input type="text" id="drop_cours" name="drop_cours" />
				<br />
				<label htmlFor="take_cours">take course:</label>
				<input type="text" id="take_cours" name="take_cours" />
				<br />
				<input type="button" onClick={handleSubmit} value="submit" />
			</form>
			
			<iframe name="table"></iframe>
		</div>
    </div>
  );
}

export default App;
