---
{
  "title": "Spring Web Development Cookbook",
  "draft": false,
  "created_at": "2024-12-22",
  "category": "Backend",
  "tags": ["Spring"],
  "description": "Spring framewrok overview"
}
---

## IoC (Inversion of Control) and DI (Dependency Injection)

**IoC (Inversion of Control)** is a design principle in software engineering used to achieve a higher level of decoupling between software components. It refers to the process by which **the control of objects or portions of a program is transferred from the program itself to a framework or a container.**

* Traditionally, an object is responsible for instantiating its dependencies.

* With IoC, the control of creating and managing these dependencies is inverted and given to a container or framework.
* By delegating responsibilities, IoC reduces the dependencies between components, making the codebase more modular, easier to test, and maintainable.

**Dependency Injection (DI)** is a design pattern and a way of implementing **Inversion of Control (IoC)**. It involves providing an object with its dependencies from the outside rather than the object creating them itself. This external provisioning of dependencies makes the code more modular, testable, and easier to maintain.

#### @Bean

Any normal Java class that is instantiated, assembled, and otherwise managed by a Spring IoC container is called Spring Bean. In Spring Framework, the `@Bean` annotation is used to explicitly declare a method that produces a bean to be managed by the Spring container. It is often used in conjunction with `@Configuration` to define and configure beans in Java-based configuration.

```java
package com.example.config;

import com.example.beans.Vehicle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
Spring @Configuration annotation is part of the spring core framework.
Spring Configuration annotation indicates that the class has @Bean definition
methods. So Spring container can process the class and generate Spring Beans
to be used in the application.
* */
@Configuration
public class ProjectConfig {
    /*
    @Bean annotation, which lets Spring know that it needs to call
    this method when it initializes its context and adds the returned
    value to the context.
    By default, Spring will consider the method name as the bean
    name
    * */
    @Bean(name="audiVehicle") // 1st way to name a bean
    Vehicle vehicle1() {
        var veh = new Vehicle();
        veh.setName("Audi");
        return veh;
    }

    @Bean(value="hondaVehicle") // 2nd way to name a bean
    Vehicle vehicle2() {
        var veh = new Vehicle();
        veh.setName("Honda");
        return veh;
    }
    /*
    @Primary annotation is used to indicate a preferred bean when 
    multiple candidates are qualified 
    * */
  	@primary
    @Bean("ferrarVehicle") // 3rd way to name a bean
    Vehicle vehicle3() {
        var veh = new Vehicle();
        veh.setName("Ferrari");
        return veh;
    }
}
```

```java
package com.example.beans;

public class Vehicle {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
package com.example.main;

import com.example.beans.Vehicle;
import com.example.config.ProjectConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Example1 {

    public static void main(String[] args) {

        /*
        The var keyword was introduced in Java 10. Type inference is used in
        var keyword in which it detects automatically the datatype of a variable
        based on the surrounding context.
        * */
        var context = new AnnotationConfigApplicationContext(ProjectConfig.class);
        // Vehicle veh = context.getBean(Vehicle.class);
        Vehicle veh0 = context.getBean("audiVehicle", Vehicle.class);
        Vehicle veh1 = context.getBean(Vehicle.class); // return primary bean
        System.out.println("Vehicle name from Spring Context is: " + veh.getName());
    }
}
```

#### @Component

In Spring, the `@Component` annotation is a core stereotype annotation that marks a class as a Spring-managed bean. When Spring's component scanning mechanism is enabled, classes annotated with `@Component` (or its specialized annotations like `@Service`, `@Repository`, and `@Controller`) are automatically detected and registered in the Spring application context.

```java
package com.example.beans;

import org.springframework.stereotype.Component;

@Component
public class Vehicle {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void printHello(){
        System.out.println(
            "Printing Hello from Component Vehicle Bean");
    }
  
    @PostConstruct
    public void initialize(){
        this.name = "Honda";
    }
  
    @PreDestroy
    public void destroy(){
      System.out.println("Destroying Vehicle Bean");
    }
}
```

```java
package com.example.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*
Spring @Configuration annotation is part of the spring core framework.
Spring Configuration annotation indicates that the class has @Bean definition
methods. So Spring container can process the class and generate Spring Beans
to be used in the application.

To tell Spring it needs to search for classes annotated
with stereotype annotations, we use the @ComponentScan annotation over the configuration
class.
* */
@Configuration
@ComponentScan(basePackages = "com.example.beans")
public class ProjectConfig {

}
```

```java
@ComponentScan(basePackages = {"com.example.implementation",
            "com.example.services"})
@ComponentScan(basePackageClasses = {com.example.beans.Vehicle.class,
        com.example.beans.Person.class}) // Type-Safety
```

```java
package com.example.main;

import com.example.beans.Vehicle;
import com.example.config.ProjectConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Example5 {

    public static void main(String[] args) {

        var context = new AnnotationConfigApplicationContext(ProjectConfig.class);
        Vehicle vehicle = context.getBean(Vehicle.class);
        System.out.println("Component Vehicle name from Spring Context is: " + vehicle.getName());
        vehicle.printHello();

    }
}
```

@Component: Only one instance of the class can be added to the Spring Context

@Bean: One or more instances of the class can be added to the Spring Context

#### Adding new beans programatically

```java
var context = new AnnotationConfigApplicationContext(ProjectConfig.class);

Vehicle volkswagen = new Vehicle();
volkswagen.setName("Volkswagen");
Supplier<Vehicle> volkswagenSupplier = () -> volkswagen;
context.registerBean("volkswagen",
                    Vehicle.class,volkswagenSupplier);
```

#### Adding new beans using XML configs (outdated)

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Bean Definition -->
    <bean id="myBean" class="com.example.MyBean">
        <!-- Property injection -->
        <property name="property1" value="SomeValue"/>
        <property name="property2" ref="anotherBean"/>
    </bean>

    <!-- Another bean to reference -->
    <bean id="anotherBean" class="com.example.AnotherBean"/>
</beans>
```

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        MyBean myBean = context.getBean("myBean", MyBean.class);
        myBean.doSomething();
    }
}
```

#### Wiring beans

**Wiring Beans Using Method Call**

```java
package com.example.config;

import com.example.beans.Person;
import com.example.beans.Vehicle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*
Spring @Configuration annotation is part of the spring core framework.
Spring Configuration annotation indicates that the class has @Bean definition
methods. So Spring container can process the class and generate Spring Beans
to be used in the application.
* */
@Configuration
public class ProjectConfig {

    @Bean
    public Vehicle vehicle() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Toyota");
        return vehicle;
    }

    /*
    Here in the below code, we are trying to wire or establish a relationship between Person and
    Vehicle, by invoking the vehicle() bean method from person() bean method.

    Spring will make sure to have only 1 vehicle bean is created and also vehicle bean will
    be created first always as person bean has dependency on it.
    * */
    @Bean
    public Person person() {
        Person person = new Person();
        person.setName("Lucy");
        person.setVehicle(vehicle());
        return person;
    }

}
```

**Wiring Beans Using Method Parameters**

```java
package com.example.config;

import com.example.beans.Person;
import com.example.beans.Vehicle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*
Spring @Configuration annotation is part of the spring core framework.
Spring Configuration annotation indicates that the class has @Bean definition
methods. So Spring container can process the class and generate Spring Beans
to be used in the application.
* */
@Configuration
public class ProjectConfig {

    @Bean
    public Vehicle vehicle() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Toyota");
        return vehicle;
    }

    /*
    Here in the below code, we are trying to wire or establish a relationship between Person
    and Vehicle, by passing the vehicle as a method parameter to the person() bean method.

    Spring injects the vehicle bean to the person bean using Dependency Injection. Spring will
    make sure to have only 1 vehicle bean is created and also vehicle bean will be created
    first always as person bean has dependency on it.

    * */
    @Bean
    public Person person(Vehicle vehicle) {
        Person person = new Person();
        person.setName("Lucy");
        person.setVehicle(vehicle);
        return person;
    }
}
```

#### @Autowired

The @Autowired annotation marks on a **field**, **setter method**, **constructor** is used to auto-wire the beans that is "injecting beans" at runtime by Spring Dependency Injection mechanism.

```java
package com.example.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Person {

    private String name="Lucy";

  	// Setter Injection
    // @Autowired
    public Person(Vehicle vehicle){
        System.out.println("Person bean created by Spring");
        this.vehicle = vehicle;
    }

    /*
    The @Autowired annotation marks on a field, constructor, Setter method
    is used to auto-wire the beans that is ‘injecting beans'(Objects) at runtime
    by Spring Dependency Injection mechanism
    * */
    // Field Injection
    // This is not recommended as we can't mark the fields as final
		// @Autowired 
    private Vehicle vehicle;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    // Constructor Injection
    /*@Autowired*/
    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

}
```

**How autowiring works with multipele beans of same type**

1. By Bean Name

   ```java
   @Component
   public class Person {
   
       private String name="Lucy";
       private final Vehicle vehicle;
   
       @Autowired
       public Person(Vehicle vehicle1){
           System.out.println("Person bean created by Spring");
           this.vehicle = vehicle;
       }
   
       public String getName() {
           return name;
       }
   
       public void setName(String name) {
           this.name = name;
       }
   
       public Vehicle getVehicle() {
           return vehicle;
       }
   
   }
   ```

2. Primary Bean with `@Primary` Annotation

3. Using `@Qualifier` Annotation

   ```java
   @Component
   public class Person {
   
       private String name="Lucy";
       private final Vehicle vehicle;
   
       @Autowired
       public Person(@Qualifier("vehicle2") Vehicle vehicle){
           System.out.println("Person bean created by Spring");
           this.vehicle = vehicle;
       }
   
       public String getName() {
           return name;
       }
   
       public void setName(String name) {
           this.name = name;
       }
   
       public Vehicle getVehicle() {
           return vehicle;
       }
   
   }
   ```

#### Bean Scopes

1. Singleton

   The **singleton scope** in Spring is the default scope for Spring-managed beans. It means that **only one instance** of the bean will be created and shared across the entire Spring application context.

2. Prototype

   The **prototype scope** in Spring means that a **new instance** of the bean is created **every time it is requested** from the Spring container. Unlike the singleton scope, where one instance is shared across the entire application context, the prototype scope ensures that each request receives a fresh instance.

   ```java
   @Component
   @Scope(BeanDefinition.SCOPE_PROTOTYPE)
   public class VehicleServices {
   ```

3. Request

4. Session

5. Application

#### Eagle & Lazy Instantiation

By default Spring will create all the singleton beans eagerly during the startup of the applicaiton itself. This is called Eager instantiation.

We can change the default behavior to initialize the singleton beans lazily only when the application is trying to refer to the bean. This approach is called Lazy instantiation.

```java
@Component(value="personBean")
@Lazy
public class person{

```

## Aspect Oriented Programming (AOP)

**AOP (Aspect-Oriented Programming)** in Spring is a programming paradigm that allows developers to modularize cross-cutting concerns in their applications. Cross-cutting concerns are functionalities that affect multiple layers or components of an application, such as logging, transaction management, security, caching, etc.

AOP helps in separating these concerns from the core business logic, making the code more modular, reusable, and easier to maintain.

>Developer want **some logic (Aspect)** to be executed **before (Advice)** each **execution (Joinpoint)** of method **playMusic() (Point cut)** present inside the bean **VehicleServices (Target Object)**.

We try to invoke a method inside a bean, Spring instead of directly giving reference of the bean instead it will give a proxy object that will manage the each call to a method and apply the aspect logic. This process is called **Weaving**.

Type of advices in Spring AOP

* @Before
* @AfterReturning
* @AfterThrowing
* @After
* @Around

We can use the **AspectJ pointcut expression** to provide details to Spring about what kind of methods it needs to intercept by mentioning details around modifier, return type, name pattern, package name pattern, params pattern, exception pattern etc.

https://docs.spring.io/spring-framework/reference/core/aop/ataspectj/pointcuts.html#aop-pointcuts-examples

```java
// step 1: config
@Configuration
@ComponentScan(basePackages = {"com.example.implementation",
            "com.example.services", "com.example.aspects"})
@EnableAspectJAutoProxy
public class ProjectConfig {

}

// step 2: define aspect
@Aspect
@Component
@Order(2)
public class LoggerAspect {

    private final Logger logger = Logger.getLogger(LoggerAspect.class.getName());

    @Around("execution(* com.example.services.*.*(..))")
    public void log(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info(joinPoint.getSignature().toString() + " method execution start");
        Instant start = Instant.now();
        joinPoint.proceed();
        Instant finish = Instant.now();
        long timeElapsed = Duration.between(start, finish).toMillis();
        logger.info("Time took to execute the method : "+timeElapsed);
        logger.info(joinPoint.getSignature().toString() + " method execution end");
    }
}
```

Annotation style of configure advices

```java
// Step 1: Create an annotation type
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogAspect {
}

// Step 2: Mention the same annotation on top of the method which we want to intercept using AOP
@LogAspect
    public String playMusic(boolean vehicleStarted, Song song){}

// Step 3: Use the annotation details to configure on top of the aspect method to advice
@Around("@annotation(com.example.interfaces.LogAspect)")
    public void logWithAnnotation(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info(joinPoint.toString() + " method execution start");
        Instant start = Instant.now();
        joinPoint.proceed();
        Instant finish = Instant.now();
        long timeElapsed = Duration.between(start, finish).toMillis();
        logger.info("Time took to execute the method : "+timeElapsed);
        logger.info(joinPoint.getSignature().toString() + " method execution end");
    }
```

## Set up Springboot project

Several ways to set up your springboot project

1. IDE can do that
2. https://start.spring.io/ This website can help you generate the pom.xml

Let's take a look at the pom.xml auto generated

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.4.1</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>demo</name>
	<description>Demo project for Spring Boot</description>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>23</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

```

Pay attention to 

```xml
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.4.1</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
```

**How It Helps**: Simplifies Dependency Management. You don’t need to specify explicit versions for most dependencies like `spring-boot-starter-web` or `spring-boot-starter-data-jpa`. Spring Boot manages them for you.

```java
package dev.zhengyan.springbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootDemoApplication.class, args);
    }
}

```

@SpringBootApplication includes 3 annotations:

* @EnableAutoConfiguration: It instructs Spring Boot to automatically configure the application context by scanning and setting up beans based on the dependencies available on the classpath.
* @ComponentScan: It is an annotation used to specify the base packages for component scanning (e.g., `@Component`, `@Service`, `@Repository`, `@Controller`)
* @SpringBootConfiguration: It is used to designate a class as a configuration class for a Spring Boot application.  It is essentially a variant of Spring's `@Configuration` annotation, with additional features specific to Spring Boot.

## Router in Springboot

1. Create a controller package in the same package of @SpringBootApplication class (where we start the whole project).
2. Under the controller package, create a controller class

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class HomeController {
    @GetMapping(value={"", "/"})
    @ResponseBody
    public String displayHomePage() {
        return "HelloWord";
    }
}
```

`@RequestMapping` is a versatile annotation for configuring web endpoints. `@RequestMapping(value = "/hello", method = RequestMethod.GET)` is equal to `@GetMapping("hello")`

`@ResponseBody` is an annotation in the **Spring Framework** (a popular Java framework) used to indicate that the return value of a method should be serialized directly into the HTTP response body, rather than being interpreted as a view name.

`@RestController` is `@Controller` + `@ResponseBody`

1. It is marked as a **Spring-managed controller** capable of handling HTTP requests.
2. All methods within the class return data (e.g., JSON, XML, or plain text) directly as the HTTP response body, without the need to annotate each method with `@ResponseBody`.

## HTTP Request and Response

1. path variable

   ```java
   @GetMapping("/{id}")
   public String getUserById(@PathVariable("id") String id) {
       return "User ID: " + id;
   }
   @GetMapping("/{category}/{id}")
   public String getProductDetails(@PathVariable("category") String category, 
                                   @PathVariable("id") int id) {
       return "Category: " + category + ", Product ID: " + id;
   }
   @GetMapping("/dynamic/{pathVariable1}/{pathVariable2}")
   public String handleDynamicVariables(@PathVariable Map<String, String> pathVariables) {
       return "Variables: " + pathVariables.toString();
   }
   ```

2. request parameter

   ```java
   
   @GetMapping("/greet")
   public String greetUser(@RequestParam(value = "name", defaultValue = "Guest", required = false) String name) {
       return "Hello, " + name;
   }
   
   // Using a Map for Dynamic Parameters
   @GetMapping("/query")
   public String queryParameters(@RequestParam Map<String, String> allParams) {
       return "Parameters: " + allParams.toString();
   }
   
   // Handling List or Array Parameters
   @GetMapping("/items")
   public String getItems(@RequestParam("id") List<Integer> ids) {
       return "Item IDs: " + ids.toString();
   }
   ```

3. reqeust header

   ```java
   @GetMapping("/welcome")
   public String getHeader(@RequestHeader("User-Agent") String userAgent) {
       return "User-Agent: " + userAgent;
   }
   
   @GetMapping("/all-headers")
   public String getAllHeaders(@RequestHeader Map<String, String> headers) {
       return "Headers: " + headers.toString();
   }
   ```

4. response

   ```java
   @GetMapping("/ok")
   public ResponseEntity<String> returnOk() {
       return ResponseEntity.ok("Request was successful!");
   }
   // status code
   @GetMapping("/not-found")
   public ResponseEntity<String> returnNotFound() {
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
   }
   // headers
   @GetMapping("/headers")
   public ResponseEntity<String> returnWithHeaders() {
       HttpHeaders headers = new HttpHeaders();
       headers.add("Custom-Header", "CustomHeaderValue");
       return ResponseEntity.ok().headers(headers).body("Response with custom header");
   }
   ```

## Auto Restart

1. Add dev tools to POM.xml

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-devtools</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. Settings -> compiler -> Build Project Automatically

## Lombok

**Lombok** is a popular Java library designed to reduce boilerplate code by automatically generating commonly used methods like getters, setters, constructors, `toString()`, and more.

#### **1. `@Getter` and `@Setter`**

- Generates getter and setter methods for fields.
- Can be applied at the class or field level.

**Example**:

```java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    private String name;
    private int age;
}
```

Equivalent to:

```java
public class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

#### **2. `@ToString`**

- Generates a `toString()` method for the class.

**Example**:

```java
import lombok.ToString;

@ToString
public class Person {
    private String name;
    private int age;
}
```

**Output**:

```
Person(name=John, age=30)
```

#### **3. `@EqualsAndHashCode`**

- Generates `equals()` and `hashCode()` methods based on fields.

**Example**:

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Person {
    private String name;
    private int age;
}
```

#### **4. `@NoArgsConstructor`, `@AllArgsConstructor`, and `@RequiredArgsConstructor`**

- Generate constructors automatically.
  - `@NoArgsConstructor`: No-argument constructor.
  - `@AllArgsConstructor`: Constructor with all fields.
  - `@RequiredArgsConstructor`: Constructor for final fields or fields marked with `@NonNull`.

**Example**:

```java
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class Person {
    private String name;
    private int age;
}
```

#### **5. `@Data`**

- Combines `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, and `@RequiredArgsConstructor`.

**Example**:

```java
import lombok.Data;

@Data
public class Person {
    private String name;
    private int age;
}
```

#### **6. `@Builder`**

- Implements the Builder pattern for object creation.

**Example**:

```java
import lombok.Builder;

@Builder
public class Person {
    private String name;
    private int age;
}
```

**Usage**:

```java
Person person = Person.builder()
                      .name("John")
                      .age(30)
                      .build();
```

#### **7. `@Value`**

- Used for immutable classes (like Java's `record`).

**Example**:

```java
import lombok.Value;

@Value
public class Person {
    String name;
    int age;
}
```

## Data Validation

1. Add dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

2. Define data type

```java
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Contact {
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is invalid")
    private String email;

    @NotBlank(message = "Message is mandatory")
    private String message;
}
```

3. Add @Valid

```java
@GetMapping("/contact")
public ResponseEntity<String> returnContact(@Valid @RequestBody Contact contact) {
    System.out.println("Return Contact");
    return ResponseEntity.ok(contact.getName());
}
```

## Customized Data Validation

**Example 1: Password Validation**

1. Define Annatation

```java
@Documented
@Constraint(validatedBy = PasswordStrengthValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordValidator {
    String message() default "Please choose a strong password";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

2. Implement Validation Logic

```java
public class PasswordStrengthValidator implements
        ConstraintValidator<PasswordValidator, String> {

    List<String> weakPasswords;

    @Override
    public void initialize(PasswordValidator passwordValidator) {
        weakPasswords = Arrays.asList("12345", "password", "qwerty");
    }

    @Override
    public boolean isValid(String passwordField,
                           ConstraintValidatorContext cxt) {
        return passwordField != null && (!weakPasswords.contains(passwordField));
    }
}
```

3. Add anotation to the class

```java
    @PasswordValidator
    private String pwd;
```

**Example 2: Two Fields should match**

1. Define Annotation

```java
@Constraint(validatedBy = FieldsValueMatchValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldsValueMatch {

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    String message() default "Fields values don't match!";

    String field();

    String fieldMatch();

    @Target({ ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        FieldsValueMatch[] value();
    }
}
```

2. Implement Validation Logic

```java
public class FieldsValueMatchValidator
        implements ConstraintValidator<FieldsValueMatch, Object> {

    private String field;
    private String fieldMatch;

    @Override
    public void initialize(FieldsValueMatch constraintAnnotation) {
        this.field = constraintAnnotation.field();
        this.fieldMatch = constraintAnnotation.fieldMatch();
    }

    @Override
    public boolean isValid(Object value,ConstraintValidatorContext context) {
        Object fieldValue = new BeanWrapperImpl(value)
                .getPropertyValue(field);
        Object fieldMatchValue = new BeanWrapperImpl(value)
                .getPropertyValue(fieldMatch);
        if (fieldValue != null) {
            if(fieldValue.toString().startsWith("$2a")){
                return true;
            }else {
                return fieldValue.equals(fieldMatchValue);
            }
        } else {
            return fieldMatchValue == null;
        }
    }
}
```

3. Add the Annotation to Class

```java
@FieldsValueMatch.List({
        @FieldsValueMatch(
                field = "pwd",
                fieldMatch = "confirmPwd",
                message = "Passwords do not match!"
        ),
        @FieldsValueMatch(
                field = "email",
                fieldMatch = "confirmEmail",
                message = "Email addresses do not match!"
        )
})
public class Person
```

## Exception Handling

**ResponseEntityExceptionHandler**

`ResponseEntityExceptionHandler` is a **base class** provided by the **Spring Framework** for handling exceptions in a centralized and consistent manner. This class is particularly useful for building robust REST APIs, as it helps standardize how exceptions are handled and responses are returned to the client.

```java
@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionRestController extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        Response response = new Response(statusCode.toString(),
                ex.getBindingResult().toString());
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Response> exceptionHandler(Exception exception){
        Response response = new Response("500",
                exception.getMessage());
        return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

```

## Database Spring JDBC

What is JDBC?

* JDBC or Java Database Connectivity is a specification from Core Java that provides a standard abstraction for java apps to communicate with various databases.
* JDBC API along with the database driver is capable of accessing databases

Steps in JDBC to access DB

1. Load Driver Class
2. Obtain a DB connection
3. Obtain a statement using connection object
4. Execute the query
5. Process the result set
6. Close the connection

Problem with JDB

* Developers are forced to follow all the steps mentioned to perform any kid of operation with DB which results in lots of duplicate code at many places
* Developers needs to handle the checked exceptions that will throw from the API
* JDBC is database dependent

What is Spring JDBC?

* Spring JDBC simplifies the use of JDBC and helps to avoid common errors. It executes core JDBC workflow, leaving application code to provide SQL and exetract results. It does this magic by providing JDBC templates which developers can use inside their applications.

### Spring JDBC Example:

SpringBoot auto configures DataSource, JdbcTemplate and NamedParameterJdbcTemplate classes based on the DB connection details mentioned in the property file and you can @Autowire them directly into your own repository classes.

#### 1. Define MySQL info in application.properties

```properties
spring.datasource.url=jdbc:mysql://spring.csztgqfwf0l0.us-east-2.rds.amazonaws.com/eazyschool
spring.datasource.username=admin
spring.datasource.password=mysqlspringAbc!
```

#### 2. Define Repository

```java
@Repository
public class HolidaysRepository {
    private final JdbcTemplate jdbcTemplate;

  	// JdbcTemplate is auto configured by Springboot
    @Autowired
    public HolidaysRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Holiday> findAllHolidays() {
        String sql = "SELECT * FROM holidays";
        var rowMapper = BeanPropertyRowMapper.newInstance(Holiday.class);
        return jdbcTemplate.query(sql, rowMapper);
    }
}
```

```java
@Repository
public class ContactRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ContactRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int saveContactMsg(Contact contact){
        String sql = "INSERT INTO CONTACT_MSG (NAME,MOBILE_NUM,EMAIL,SUBJECT,MESSAGE,STATUS," +
                "CREATED_AT,CREATED_BY) VALUES (?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql,contact.getName(),contact.getMobileNum(),
                contact.getEmail(),contact.getSubject(),contact.getMessage(),
                contact.getStatus(),contact.getCreatedAt(),contact.getCreatedBy());
    }

    public List<Contact> findMsgsWithStatus(String status) {
        String sql = "SELECT * FROM CONTACT_MSG WHERE STATUS = ?";
        return jdbcTemplate.query(sql,new PreparedStatementSetter() {
            public void setValues(PreparedStatement preparedStatement) throws SQLException {
                preparedStatement.setString(1, status);
            }
        },new ContactRowMapper());
    }

    public int updateMsgStatus(int contactId, String status,String updatedBy) {
        String sql = "UPDATE CONTACT_MSG SET STATUS = ?, UPDATED_BY = ?,UPDATED_AT =? WHERE CONTACT_ID = ?";
        return jdbcTemplate.update(sql,new PreparedStatementSetter() {
            public void setValues(PreparedStatement preparedStatement) throws SQLException {
                preparedStatement.setString(1, status);
                preparedStatement.setString(2, updatedBy);
                preparedStatement.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
                preparedStatement.setInt(4, contactId);
            }
        });
    }

}
```



#### 3. RowMapper

If the column names in a table and field names inside a POJO/Bean are matching, then we can use BeanPropertyRowMapper which is procided by Spring frame work

```java
public List<Holiday> findAllHolidays() {
    String sql = "SELECT * FROM holidays";
    var rowMapper = BeanPropertyRowMapper.newInstance(Holiday.class);
    return jdbcTemplate.query(sql, rowMapper);
}
```

RowMapper Implementation

```java
public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        return user;
    }
}
```

```java
@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> getAllUsers() {
        String sql = "SELECT id, name, email FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }
}
```

Lambda-Based RowMapper 

```java
private final RowMapper<Person> personRowMapper = (resultSet, rowNum) -> {
  Person person = new Person();
  person.setFirstName(resultSet.getString("first_name"));
  person.setLastName(resultSet.getString("last_name"));
  return person;
}
```

```java
public List<Person> findAllPersons(){
  return this.jdbvTemplate.query("SELECT first_name, last_name FROM person", personRowMapper);
}
```

## Database Spring Data JPA

| Spring Data                                                | **Spring Data** JPA                             |
| :--------------------------------------------------------- | ----------------------------------------------- |
| General project for interacting with various data sources. | Specialized for relational databases using JPA. |

**Spring Data JPA** provides interfaces that serve as a base for creating repositories to interact with a database. 

* Use **`CrudRepository`** or **`ListCrudRepository`** for simple CRUD operations.

* Use **`PagingAndSortingRepository`** or **`ListPagingAndSortingRepository`** if you need advanced features like pagination or sorting.

* Prefer **`ListCrudRepository`** and **`ListPagingAndSortingRepository`** if you find `List` more convenient than `Iterable`. 

**Derived query methods** in **Spring Data JPA** are methods in a repository interface whose names are parsed by Spring Data JPA to automatically generate database queries.

### Setup

Step 1: We need to indicate a java POJO class as an entityclass by using annotations like @Entity, @Table, @Column

```java
@Entity
@Table(name="contact_msg")
public class Contact extends BaseEntity{

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @Column(name = "contact_id")
    private int contactId;
```

Step 2:  We beed to create interfaces for a given table entity by extending framework provided Repository interfaces. This helps us to run the basic CRUD operations on the table w/o writing implementations.

```java
@Repository
public interface ContactRepository extends CrudRepository<Contact, Integer> {
}
```

Step 3: Enable JPA functionality and scanning by using the annotations @EnableJPARepositories and @EntityScan

```java
@SpringBootApplication
@EnableJpaRepositories("dev.zhengyan.repository")
@EntityScan("dev.zhengyan.model")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

Step 4: We can inject repository beans into any controller/service classes and execute the required DB operations.

```java
@Service
public class ContactServices{
  @Autowired
  private ContactRepository;
  
  public boolean saveMessageDetails(Contact contact){
    boolean isSaved = false;
    Contact saveContact = contactRepository.save(contact);
    if(null!=saveContact && savedContact.getContactId()>0){
      isSaved = true;
    }
    return isSaved;
  }
}
```
