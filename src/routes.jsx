// Libraries
import React from 'react'; // eslint-disable-line no-unused-vars
import Router from 'react-router';
let {Route, DefaultRoute, NotFoundRoute} = Router;

import Main from './components//main/main.jsx';
import Logo from './components//logo/logo.jsx';


import AbreCaja from './components/AbreCaja/AbreCaja.jsx';
/*import DepsYExtr from './components/DepsYExtr/DepsYExtr.jsx';
import GastosChicos from './components/GastosChicos/GastosChicos.jsx';
import Venta from './components/Venta/Venta.jsx';
import Traspaso from './components/Traspaso/Traspaso.jsx';
import CierreCaja from './components/CierreCaja/CierreCaja.jsx';
import Clientes from './components/Clientes/Clientes.jsx';
import SumarioVentas from './components/SumarioVentas/SumarioVentas.jsx';
import SumarioDia from './components/SumarioDia/SumarioDia.jsx';
import top10 from './components/top10/top10.jsx';
import Conciliacion from './components/Conciliacion/Conciliacion.jsx';
import Mayor?cuenta=5720000 from './components/Mayor?cuenta=5720000/Mayor?cuenta=5720000.jsx';
import DebitosEnBanco from './components/DebitosEnBanco/DebitosEnBanco.jsx';
import CreditosEnBanco from './components/CreditosEnBanco/CreditosEnBanco.jsx';
import JustificarDebito from './components/JustificarDebito/JustificarDebito.jsx';
import Cheques from './components/Cheques/Cheques.jsx';
import Proveedores from './components/Proveedores/Proveedores.jsx';
import ProveedoresEx from './components/ProveedoresEx/ProveedoresEx.jsx';
import EstadisticaGastos from './components/EstadisticaGastos/EstadisticaGastos.jsx';
import TiposProveedor from './components/TiposProveedor/TiposProveedor.jsx';
import PronosticoGastos from './components/PronosticoGastos/PronosticoGastos.jsx';
import EstimacionGastos from './components/EstimacionGastos/EstimacionGastos.jsx';
*/import Asientos from './components/Asientos/Asientos.jsx';/*
import Errores from './components/Errores/Errores.jsx';
import Mayor from './components/Mayor/Mayor.jsx';
import Consulta?Consulta=Select+*+From+cuentas+order+by+codigo from './components/Consulta?
Consulta=Select+*+From+cuentas+order+by+codigo/Consulta?Consulta=Select+*+From+cuentas+order+by+codigo.jsx';
import AporteSocio from './components/AporteSocio/AporteSocio.jsx';
import ReintegroASocio from './components/ReintegroASocio/ReintegroASocio.jsx';
import Dividendos from './components/Dividendos/Dividendos.jsx';
import Nomina from './components/Nomina/Nomina.jsx';
import NominasVsIngresos from './components/NominasVsIngresos/NominasVsIngresos.jsx';
import password from './components/password/password.jsx';
import Usuarios from './components/Usuarios/Usuarios.jsx';
import EditaMenu from './components/EditaMenu/EditaMenu.jsx';
*/
export default (
	<Route name='app' path='/' handler={Main}>
		<Route name="AbreCaja" handler={AbreCaja} />
		{/*
		<Route name="DepsYExtr" handler={DepsYExtr} />
		<Route name="GastosChicos" handler={GastosChicos} />
		<Route name="Venta" handler={Venta} />
		<Route name="Traspaso" handler={Traspaso} />
		<Route name="CierreCaja" handler={CierreCaja} />
		<Route name="Clientes" handler={Clientes} />
		<Route name="SumarioVentas" handler={SumarioVentas} />
		<Route name="SumarioDia" handler={SumarioDia} />
		<Route name="top10" handler={top10} />
		<Route name="Conciliacion" handler={Conciliacion} />
		<Route name="Mayor?cuenta=5720000" handler={Mayor?cuenta=5720000} />
		<Route name="DebitosEnBanco" handler={DebitosEnBanco} />
		<Route name="CreditosEnBanco" handler={CreditosEnBanco} />
		<Route name="JustificarDebito" handler={JustificarDebito} />
		<Route name="Cheques" handler={Cheques} />
		<Route name="Proveedores" handler={Proveedores} />
		<Route name="ProveedoresEx" handler={ProveedoresEx} />
		<Route name="EstadisticaGastos" handler={EstadisticaGastos} />
		<Route name="TiposProveedor" handler={TiposProveedor} />
		<Route name="PronosticoGastos" handler={PronosticoGastos} />
		<Route name="EstimacionGastos" handler={EstimacionGastos} />
		*/<Route name="Asientos" handler={Asientos} />/*
		<Route name="Errores" handler={Errores} />
		<Route name="Mayor" handler={Mayor} />
		<Route name="Consulta?Consulta=Select+*+From+cuentas+order+by+codigo" handler={Consulta
		?Consulta=Select+*+From+cuentas+order+by+codigo} />
		<Route name="AporteSocio" handler={AporteSocio} />
		<Route name="ReintegroASocio" handler={ReintegroASocio} />
		<Route name="Dividendos" handler={Dividendos} />
		<Route name="Nomina" handler={Nomina} />
		<Route name="NominasVsIngresos" handler={NominasVsIngresos} />
		<Route name="password" handler={password} />
		<Route name="Usuarios" handler={Usuarios} />
		<Route name="EditaMenu" handler={EditaMenu} />
		*/}
		<DefaultRoute handler={Logo} />
		<NotFoundRoute name="notFound" handler={Logo} />
    </Route>
);
