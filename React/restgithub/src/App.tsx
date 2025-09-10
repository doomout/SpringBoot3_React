import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import type { ColDef } from 'ag-grid-community';

// ✅ v31 이후 필수: 모듈 등록
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

// ✅ 커뮤니티 모듈 전체 등록
ModuleRegistry.registerModules([AllCommunityModule]);

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};


function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const handleClick = () =>{
    // REST API 호출
    axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => setRepodata(response.data.items))
    .catch(err => console.error(err))
  }

  // 칼럼 정의
  const [columnDefs] = useState<ColDef[]> ([
    {field: 'id', sortable: true, filter: true},
    {field: 'full_name', sortable: true, filter: true},
    {field: 'html_url', sortable: true, filter: true},
  ]);

  return (
    <>
    <div className="App">
      <input value={keyword} onChange={e => setKeyword(e.target.value)}/>
      <button onClick={handleClick}>검색</button>
      <div className="ag-theme-material" style={{height: 500, width: 850}}>
        <AgGridReact 
          rowData={repodata} 
          columnDefs={columnDefs} 
          pagination={true} 
          paginationPageSize={8}/>
      </div>
      {/* 기존코드
      {repodata.length === 0 ? (<p>찾는 데이터 없어</p>):(
        <table>
          <tbody>
            {repodata.map(repo => (
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      */}
    </div>
    </>
  )
}

export default App
