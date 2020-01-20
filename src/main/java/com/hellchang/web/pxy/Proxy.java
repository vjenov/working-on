package com.hellchang.web.pxy;

import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component("pxy") @Lazy
public class Proxy {
       public String string(Object param) {
           Function<Object, String> f = String :: valueOf;
           
    	   return f.apply(param);
              
              }
       
       public int integer(String param) {
           Function<String, Integer> f = Integer :: parseInt;
    	   return f.apply(param);
              
       }
       
       public boolean equal(String t, String u) {
           
    	   BiPredicate<String, String> p = String :: equals;
    	   
    	   return p.test(t, u);
              
       }
       
       public void print(String param) {
              Consumer<String> c = System.out :: print;
              c.accept(param);
              
       }
}