import { createSignal, createComputed, For, Show } from "solid-js"


export default function Table(props) {


  return (
    <table
       style= {{
            "border-collapse" : "collapse",
       }}
    >
      <thead>
        <tr>
          <For each={props.columns!}>
            {(column) => {
              return (
                <th
		   style = {{border : "solid 1px black", "background-color": "lightgray"}}
                >
                  {column}
                </th>
              )
            }}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={props.rows!}>
          {(row) => {
            return (
              <tr >
                <For each={props.columns!}>
                  {(column) => {
                    return (
                      <td
		       style = {{border : "solid 1px black", padding: "1px 20px"}}
                      >
                        {row[column]}
                      </td>
                    )
                  }}
                </For>
              </tr>
            )
          }}
        </For>
      </tbody>
    </table>
  )
}

