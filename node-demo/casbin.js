import { newEnforcer, newModelFromString } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';

const rbacModelText = `
[request_definition]
r = sub, obj, act
[policy_definition]
p = sub, obj, act
[role_definition]
g = _, _
[policy_effect]
e = some(where (p.eft == allow))
[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`

const newEnforcerWithTypeorm = async options => {
    const a = await TypeORMAdapter.newAdapter(options);
    const m = newModelFromString(rbacModelText)
    const e = await newEnforcer(m, a)
    await e.loadPolicy()
    return e
}

export default newEnforcerWithTypeorm