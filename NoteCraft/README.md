# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## Skeumorphism Design

              bg-[#e0e5ec] text-gray-700
              shadow-[inset_5px_5px_10px_#a3b1c6,_inset_-5px_-5px_10px_#ffffff]
              focus:shadow-[inset_8px_8px_15px_#a3b1c6,_inset_-8px_-8px_15px_#ffffff]

         
 {/* <Listbox value={model} onChange={setModel}>
            <div className="relative w-52">
              <Listbox.Button className="relative w-full bg-[#1f1f1f] text-white px-5 py-2 rounded-lg border border-gray-600 text-left">
                {model.name}
              </Listbox.Button>

              <Listbox.Options className="absolute bottom-full mb-1 w-72 bg-[#1f1f1f] rounded-lg border border-gray-600 z-50 max-h-60 overflow-y-auto">
                {models.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    value={item}
                    className="px-5 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox> */}



           // const models = [
  //   { id: 'llama-3.1-8b-instant', name: 'Meta 3.2', desc: 'Fast' },
  //   { id: 'groq/compound', name: 'Claude', desc: 'Advanced code & Debugging' },
  //   { id: 'qwen/qwen3-32b', name: 'Copilot', desc: 'Daily Task' },
  //   { id: 'openai/gpt-oss-120b', name: 'ChatGPT 5.1', desc: 'Tough Reasoning' },
  // ]