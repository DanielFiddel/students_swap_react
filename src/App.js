import {useState, useEffect} from "react";

function App() {
	const [pair, setpair] = useState([]);
	const [archive, setarchive] = useState([]);
	const [queue, setqueue] = useState([]);
	
	function handleSubmit(e) {
		e.preventDefault();
		var btm = document.getElementById("myform");
		var f = new FormData(btm);
		/*for(var p of f.entries()){
			console.log(p);
		}*/
		fetch("http://127.0.0.1:5000/ping",{body: f, method: "post"})
		.then(function(response){
			var data = response.json()
			//console.log(data)
			//console.log(JSON.stringify(data))
			//setpair(data)
			return data
		})
		.then(function(response){
			//console.log(response, "fetch")
			//console.log(JSON.stringify(response))
			setpair(response)
		});
		
		fetch("http://127.0.0.1:5000/ping",{method: "get"})
		.then(function(response){
			var data = response.json()
			//console.log(data)
			//console.log(JSON.stringify(data))
			//setarchive(data)
			return data
		})
		.then(function(response){
			//console.log(response, "fetch")
			//console.log(JSON.stringify(response))
			setarchive(response)
		});
		
		fetch("http://127.0.0.1:5000/queue",{method: "get"})
		.then(function(response){
			var data = response.json()
			//console.log(data)
			//console.log(JSON.stringify(data))
			//setarchive(data)
			return data
		})
		.then(function(response){
			//console.log(response, "fetch")
			//console.log(JSON.stringify(response))
			setqueue(response)
		});
		
		btm.reset();
	}
	
	function handleRemove(e) {
		e.preventDefault();
		var btm = document.getElementById("myform");
		var f = new FormData(btm)
		fetch("http://127.0.0.1:5000/remove",{body: f, method: "post"})
		.then(function(response){
			var data = response.text()
			//console.log(data, "data")
			return data
		})
		.then(function(response){
			console.log(response)
		});
	}
  
  return (
    <div>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous" />
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
				<input type="button" onClick={handleRemove} value="remove" />
			</form>
			
			<div>
				<table className="table">
				<tbody>
					<tr>
						{pair.map((st, i) => <td key={i}>{st.s_id}</td>)}
					</tr>
				</tbody>
				</table>
			</div>
			<br />
			<br />
			<br />
			<div>
				<table className="table table-striped table-bordered table-sm w-auto">
				<tbody>
				{archive.map((pair, j) =>
					<tr key={j}>
						{pair.map((st, i) => <td key={i} scope="row">{typeof st === 'string' ? st : st.s_id}</td>)}
					</tr>
					)
				}
				</tbody>
				</table>
			</div>
			<div>
				<table className="table table-striped table-bordered table-sm w-auto">
				<tbody>
						{queue.map((st, i) => <tr key={i}>{st.s_id}</tr>)}
				</tbody>
				</table>
			</div>
		</div>
    </div>
  );
}

export default App;
