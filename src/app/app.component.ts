import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public T_zab:number;
  public P_ot_l: object;
  public T_ot_l: object;
  public T_ravn:object;




  constructor(){
    let Ro_otn:number = 0.56;
    let H_skv:number = 1110;
    let H_mmp:number = 100;
    let d_nkt:number = 0.062;
    let d_ekspl:number = 0.112;
    let P_y:number = 10.86;
    let T_pl:number = 299.55;
    let T_ns:number = 276;
    let h_ns:number = 4;
    let Q:number = 184*1000/(24*60*60);
    let delta_P:number = 0.7;
    let h_pl:number = 25;
    let R_k:number = 500;
    let l_k:number = 0.00004;
    let mu:number = 10.4*(10**-6);
    let tao:number = 2_000_000;
    let lambda_pl:number = 0.0024;
    let C_n:number = 920;
    let P_kr:number = 0.4903*(10-Ro_otn);
    let T_kr:number = 125*(1+Ro_otn);
    let R_c = d_ekspl/2;
    let T_mmp = 271;
    let H_ns = 40;
    let lambda_m = 0.0014;
    let C_m = 7470;
    let epsilon = 2*l_k/d_ekspl;
    let lambda:number = 0.0933*((epsilon)**0.25);

      // функция рассчёта забойной температуры
      function calculate_T_zab(){
        let P_pl = P_zab+delta_P;
        let f_ot_tao = Math.log(1 + Math.sqrt((Math.PI*tao*lambda_pl)/(C_n*(R_c)**2)));
        let C_p_pl = ((13.188+0.0922*T_pl - 0.0000623 * (T_pl)**2)/(28.966*Ro_otn)) +
        ((13.55*(P_pl)**1.124)/((0.01*T_pl)**5.08));
        
        let f_ot_PT = ((9.81*((T_pl/T_kr)**-2.04)) - 0.297*((P_pl/P_kr) - 0.8))/(28.966*Ro_otn);
        let D_i = T_kr*f_ot_PT/(P_kr*C_p_pl);
        let delta_T = D_i*delta_P*(((Math.log(1+(0.014*Ro_otn*Q*C_p_pl*tao)))/(Math.PI*h_pl*C_n*(R_c**2)))/(Math.log(R_k/R_c)));
        let T_zab = T_pl-delta_T;
        return T_zab
      }
      

    // функция рассчёта забойного давления и температуры на устье
    function calculate_P_zab_and_T_y(P_zab:number, T_y:number){
      let T_sr:number = (T_y+T_pl)/2;
      let P_sr:number = (P_y + P_zab)/2;
      let z_pl:number = ((0.4*Math.log10(T_pl/T_kr)+0.73)**(P_sr/P_kr)) + 0.1*P_sr/P_kr;
      let z_y:number = ((0.4*Math.log10(T_y/T_kr)+0.73)**(P_y/P_kr)) + 0.1*(P_y/P_kr);
      let z_sr = (z_pl+z_y/2);
      let s:number = 0.03415*(Ro_otn*H_skv)/(z_sr*T_sr);
      let theta:number = (0.01413*(10**-10)*(z_sr**2)*(T_sr**2)*((Math.E**(2*s))-1)*lambda)/d_ekspl**5;
      let P_zab1 = Math.sqrt((P_y**2) * (Math.E**(2*s) + theta*(Q**2))); // !!!!

      let s_100 = (0.03415*Ro_otn*(H_skv-H_mmp))/(z_sr*T_sr);
      let theta_100 = 1.325 * (10**-12) * lambda * (((z_sr**2) * (T_sr**2))/(d_ekspl**5)) * ((Math.E**(2*s_100))-1);
      let P_mmp = (Math.E**(-s))*Math.sqrt((P_zab1**2) - (theta_100*(Q**2))); // !!!!
      let P_sr_mmp_y = (2/3)*(P_mmp + (P_y**2)/(P_y+P_mmp));
      let T_sr_mmp_y = (T_mmp+T_y)/2;
      let C_p_y = ((13.188+0.0922*T_sr_mmp_y - 0.0000623 * (T_sr_mmp_y)**2)/(28.966*Ro_otn)) +
        ((13.55*(P_sr_mmp_y)**1.124)/((0.01*P_sr_mmp_y)**5.08));
      let f_ot_PT_mmp_y = ((9.81*((T_sr_mmp_y/T_kr)**-2.04)) - 0.297*((P_sr_mmp_y/P_kr) - 0.8))/(28.966*Ro_otn);
      let D_i_mmp_y = (T_kr*f_ot_PT_mmp_y)/(P_kr*C_p_y);
      let beta_m = ((T_mmp-T_ns)**2)/((T_ns-273.15)**2)
      let f_ot_tao_mmp_y = Math.log(1 + Math.sqrt((Math.PI*tao*lambda_m)/(C_m*(R_c**2))));
      let alpha_m = (2*Math.PI*lambda_m)/(0.014*Ro_otn*Q*C_p_y*f_ot_tao_mmp_y);
      let G_mmp = (T_ns - T_mmp)/(H_mmp-H_ns);
      let T_y1 = T_mmp - (G_mmp*H_mmp) + (1 - (Math.E**(-alpha_m*H_mmp)))*(G_mmp - ((D_i_mmp_y*(P_mmp - P_y))/H_mmp) - (0.0098/C_p_y))*beta_m;



      if (P_zab == P_zab1){
        if (T_y == T_y1){
          return [P_zab1, T_y1]
        }
      }
      return calculate_P_zab_and_T_y(P_zab1, T_y1)
    }

    // функция рассчёта давления в зависимости от глубины
    function P(l:number){
      let s = (0.03415*Ro_otn*(H_skv-l))/(z_sr*T_sr) 
      let theta = 1.325 * (10**-12) * lambda * (((z_sr**2) * (T_sr**2))/(d_ekspl**5)) * ((Math.E**(2*s))-1);
      let res = (Math.E**(-s))*Math.sqrt((P_zab**2) - (theta*(Q**2)));
      return res
    }

    let P_zab = calculate_P_zab_and_T_y(P_y, T_ns)[0]-0.5;
    // this.P_zab = P_zab;
    let T_y = calculate_P_zab_and_T_y(P_y, T_ns)[1];
    // this.T_y = T_y;
    let P_pl = P_zab+delta_P;
    // this.P_pl = P_pl;
    let T_zab = calculate_T_zab();
    this.T_zab = T_zab;
    let T_sr = (T_y+T_zab)/2;
    let z_y = ((0.4*Math.log10(T_y/T_kr)+0.73)**(P_y/P_kr)) + 0.1*(P_y/P_kr);
    let z_zab = ((0.4*Math.log10(T_zab/T_kr)+0.73)**(P_zab/P_kr)) + 0.1*(P_zab/P_kr);
    let z_sr = (z_y+z_zab)/2;
    
    

    let P_ot_l:Array<number[]> = [];

    for (let index = 0; index <= H_skv; index = index+10) {
      let p_cur = P(index);
      let buff = [index, p_cur];
      P_ot_l.push(buff);
      // console.log(P_ot_l);
    }

    this.P_ot_l = P_ot_l;

    //функция рассчёта температуры в зависимости от глубины
    function T(l:number){
      let res:number;
      if (l<H_mmp){
        let P_mmp:number = P_ot_l[10][1]
        let f_ot_tao = Math.log(1 + Math.sqrt((Math.PI*tao*lambda_m)/(C_m*(R_c)**2)));
        let T_sr_mmp_y = (T_mmp+T_y)/2;
        let P_sr_mmp_y = (P_mmp+P_y)/2;
        let C_p_mmp_y = ((13.188+0.0922*T_sr_mmp_y - 0.0000623 * (T_sr_mmp_y)**2)/(28.966*Ro_otn)) +
          ((13.55*(P_sr_mmp_y)**1.124)/((0.01*P_sr_mmp_y)**5.08));
        let f_ot_PT = ((9.81*((T_sr_mmp_y/T_kr)**-2.04)) - 0.297*((P_sr_mmp_y/P_kr) - 0.8))/(28.966*Ro_otn);
        let D_i = (T_kr*f_ot_PT)/(P_kr*C_p_mmp_y);
        let delta_T =  D_i*(P_zab-P_mmp)*(((Math.log(1+(0.014*Ro_otn*Q*C_p_mmp_y*tao)))/(Math.PI*h_pl*C_m*(R_c**2)))/(Math.log(R_k/R_c)));
        let alpha = (2*Math.PI*lambda_m)/(0.014*Ro_otn*Q*C_p_mmp_y*f_ot_tao);
        let Geoterm_grad = (T_zab-T_mmp)/(H_skv-H_mmp);
        res = T_ns - (delta_T * (Math.E**(-alpha*(H_skv-l)))) + ((1 - (Math.E**(-alpha*(H_skv-l))))/(alpha)*(Geoterm_grad - ((D_i*(P_zab-P_y)/H_skv) - ((1/102)/C_p_mmp_y))))

      }else{
        let P_mmp = P_ot_l[10][1]
        let f_ot_tao = Math.log(1 + Math.sqrt((Math.PI*tao*lambda_pl)/(C_n*(R_c)**2)));
        let T_sr_zab_mmp = (T_mmp+T_zab)/2;
        let P_sr_zab_mmp = (P_mmp+P_zab)/2;
        let C_p_zab_mmp = ((13.188+0.0922*T_sr_zab_mmp - 0.0000623 * (T_sr_zab_mmp)**2)/(28.966*Ro_otn)) +
          ((13.55*(P_sr_zab_mmp)**1.124)/((0.01*P_sr_zab_mmp)**5.08));
        let f_ot_PT = ((9.81*((T_sr_zab_mmp/T_kr)**-2.04)) - 0.297*((P_sr_zab_mmp/P_kr) - 0.8))/(28.966*Ro_otn);
        let D_i = (T_kr*f_ot_PT)/(P_kr*C_p_zab_mmp);
        let delta_T =  D_i*(P_zab-P_mmp)*(((Math.log(1+(0.014*Ro_otn*Q*C_p_zab_mmp*tao)))/(Math.PI*h_pl*C_n*(R_c**2)))/(Math.log(R_k/R_c)));
        let alpha = (2*Math.PI*lambda_pl)/(0.014*Ro_otn*Q*C_p_zab_mmp*f_ot_tao);
        let Geoterm_grad = (T_mmp-T_y)/(H_skv-H_mmp);
        res = T_ns - (delta_T * (Math.E**(-alpha*(H_skv-l)))) + ((1 - (Math.E**(-alpha*(H_skv-l))))/(alpha)*(Geoterm_grad - ((D_i*(P_zab-P_y)/H_skv) - ((1/102)/C_p_zab_mmp))))
      }
      return res
    }


    let T_ot_l:Array<number[]> = [];
    for (let index = 0; index <= H_skv; index = index+10) {
      let t_cur = T(index);
      let buff = [index, t_cur];
      T_ot_l.push(buff);
      // console.log("Температура от глубины", T_ot_l);
    }
    this.T_ot_l = T_ot_l;
    // функция рассчёта равновесной температуры
    function T_ravn(p:number){
      let B = 86
      let res = 273 + (18.47*(1 + Math.log10(p))) - B;
      return res;
    }

    let T_ravn_ot_l:Array<number[]> = [];

    for (let index = 0; index < P_ot_l.length; index++) {
      let p_cur = P_ot_l[index][1];
      let T_ravn_cur = T_ravn(p_cur);
      let buff = [index, T_ravn_cur];
      T_ravn_ot_l.push(buff);
      // console.log("Равновесная температура от глубины", T_ravn_ot_l);
    }

    this.T_ravn = T_ravn_ot_l;
}
}
