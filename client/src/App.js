import React from "react";
import axios from 'axios';
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: {},
      error: false
    };
  }

  componentDidMount() {
    console.log("componentDidMount success");
    axios.get('/api/data')
      .then(res => {
        console.log("data received: ", res.data);
        // Safely set the data, defaulting to an empty object if undefined
        this.setState({ bestShows: res.data[0] || {} });
      })
      .catch(err => {
        console.error("Database fetch error:", err);
        this.setState({ error: true });
      });
  }

  render() {
    console.log("render bestShows: ", this.state.bestShows);
    
    return (
      <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#fcfcfc", color: "#333", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
        
        <header style={{ borderBottom: "1px solid #eaeaea", paddingBottom: "20px", marginBottom: "40px", width: "100%", maxWidth: "800px" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "300", letterSpacing: "6px", margin: "0", color: "#111" }}>
            SOVRANTY GEMS
          </h1>
          <p style={{ fontSize: "1.2rem", fontStyle: "italic", color: "#777", marginTop: "15px", letterSpacing: "1px" }}>
            Elegant, Chic, and Classic.
          </p>
        </header>
        
        <main style={{ maxWidth: "600px", width: "100%" }}>
          {this.state.error ? (
            <div style={{ padding: "20px", border: "1px solid #e0e0e0", backgroundColor: "#fff", borderRadius: "2px" }}>
              <p style={{ margin: "0", color: "#d9534f", fontWeight: "bold", letterSpacing: "1px" }}>
                System Diagnostic: Database Connection Failed
              </p>
            </div>
          ) : Object.keys(this.state.bestShows).length > 0 ? (
            <div style={{ textAlign: "left", backgroundColor: "#fff", padding: "30px", border: "1px solid #eaeaea", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <h3 style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem", color: "#888", borderBottom: "1px solid #f0f0f0", paddingBottom: "10px", marginBottom: "20px" }}>
                Curated Database Collection
              </h3>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {Object.keys(this.state.bestShows).map((cur, idx) => {
                  if (cur === '_id') return null; // Hides the ugly MongoDB ID from the elegant UI
                  return (
                    <li key={idx} style={{ padding: "12px 0", borderBottom: "1px solid #fafafa", fontSize: "1.1rem", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: "600", color: "#555", textTransform: "capitalize" }}>{cur}</span> 
                      <span style={{ color: "#111" }}>{this.state.bestShows[cur]}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <p style={{ color: "#999", fontStyle: "italic", letterSpacing: "1px" }}>Loading exquisite data...</p>
          )}
        </main>

      </div>
    );
  }
}

export default App;