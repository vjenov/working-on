package com.hellchang.web.cfg;

import javax.sql.DataSource;


import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@SuppressWarnings("unused")
@Configuration
@MapperScan(basePackages= {"com.hellchang.web"})
@ComponentScan(basePackages = {"com.hellchang.web"})
public class RootConfig {
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
	    dataSource.setDriverClassName("org.mariadb.jdbc.Driver");
	    dataSource.setUrl("jdbc:mariadb://localhost:3307/taem");
	    dataSource.setUsername("TAEM");
	    dataSource.setPassword("TAEM");
	    return dataSource;
	}
}